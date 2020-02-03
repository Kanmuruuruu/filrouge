const db = require('../../database');

const Student = function(student) {
  this.id = student.id;
  this.isSerious = student.isSerious;
  this.birthday = student.birthday;
  this.yearOld = student.yearOld;
  this.description = student.description;
};


Student.findAll = result => {
  db.query('SELECT * FROM student', (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    return result(null, dbResult);
  });
};

Student.findById = (id,result) => {
  db.query('SELECT * FROM student WHERE id = ? ', id, (error, dbResult) => {
    if (error) {
      console.log(error);
      return result(error, null);
    }

    return result(null, dbResult);
  });
};


Student.findAllLight = result => {
  db.query('SELECT id,birthday FROM student', (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    return result(null, dbResult);
  });
};


Student.filterBySerious = result => {
  db.query('SELECT * FROM student where isSerious = true', (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    return result(null, dbResult);
  });
};

Student.containsWord = (word, result) => {
  db.query(`SELECT * FROM student where description like "%${word}%"`, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    if (dbResult.length) {
      return result(null, dbResult);
    }

    // Not found Student with the id
    return result({kind: 'not_found'}, null);
  });
};

Student.superiorDate = (date,result) => {
  db.query(`SELECT * FROM student where birthday > ${date}`, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    if (dbResult.length) {
      return result(null, dbResult);
    }

    // Not found Student with the id
    return result({kind: 'not_found'}, null);
  });
};

Student.order = (order, result) => {
  db.query(`SELECT * FROM student order by birthday ${order}`, (error, dbResult) => {
    if(error) {
      return result(error,null);
    }
    if(dbResult.length) {
      return result(null, dbResult);
    }

    return result({kind: 'not_found'}, null);
  });
};


//*************************************** CREATE

Student.create = (newStudent, result) => {
  db.query('INSERT INTO student SET ?', newStudent, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }
    return result(null, {id: dbResult.insertId, ...newStudent});
  });
};


//*************************************** UPDATE

Student.update = (id, student, result) => {
  db.query(
    'UPDATE student SET id = ? ,isSerious = ?, birthday = ?, yearOld = ?, description = ? WHERE id = ?',
    [...Object.values(student), id],
    (error, dbResult) => {
      if (error) {
        return result(error, null);
      }
      if (dbResult.affectedRows === 0) {
        // Not found Student with the id
        return result({kind: 'not_found'}, null);
      }
      return result(null, {id: Number(id), ...student});
    }
  );
};

Student.changeSerious = (id, result) => {
  db.query('SELECT * FROM student WHERE id=?', id, (err, dbResult) => {
    if(err){
      return result(err,null);
    }
    else{
      const res = JSON.parse(JSON.stringify(dbResult))[0];
      res.isSerious = !res.isSerious;
      return db.query(
        'UPDATE student SET id = ? ,isSerious = ?, birthday = ?, yearOld = ?, description = ? WHERE id = ?',
        [...Object.values(res), id],
        (error, dbResult2)=> {
          if (error) {
            console.log(error);
            return result(error, null);
          }
          if (dbResult2.affectedRows === 0) {
            // Not found Student with the id
            return result({kind: 'not_found'}, null);
          }
          return result(null, ...dbResult2);
        });
    }
  });
};

Student.delete = (id, result) => {
  db.query('DELETE FROM student WHERE id = ?', id, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    if (dbResult.affectedRows === 0) {
      // Not found Student with the id
      return result({kind: 'not_found'}, null);
    }

    return result(null, dbResult);
  });
};

Student.deleteSerious = result => {
  db.query('DELETE FROM student WHERE isSerious = 0', (error, dbResult) => {
    if (error) {
      return result(error, null);
    }

    if (dbResult.affectedRows === 0) {
      // Not found Student with the id
      return result({kind: 'not_found'}, null);
    }

    return result(null, dbResult);
  });
};

module.exports = Student;
