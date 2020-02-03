const Student = require('../models/student.model.js');

// Get all students
exports.findAll = (request, response) => {
  Student.findAll((error, data) => {
    if (error) {
      response.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving students.'
      });
    }
    else {
      response.send(data);
    }
  });
};

exports.findById = (request, response) => {
  Student.findById(request.params.studentId, (error, data) => {
    if (error) {
      response.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving students.'
      });
    }
    else {
      response.send(data);
    }
  });
};

exports.findAllLight = (request, response) => {
  Student.findAllLight((error, data) => {
    if (error) {
      response.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving students.'
      });
    }
    else {
      response.send(data);
    }
  });
};


exports.filterBySerious = (request, response) => {
  Student.filterBySerious((error, data) => {
    if (error) {
      response.status(500).send({
        message:
          error.message || 'Some error occurred while retrieving students.'
      });
    }
    else {
      response.send(data);
    }
  });
};


exports.containsWord = (request, response) => {
  Student.containsWord(request.params.word, (error, dbResult) => {
    if (error) {
      if (error.kind === 'not_found') {
        response.status(404).send({
          message: `Not found Student with description with the word ${request.params.word}.`
        });
      } else {
        response.status(500).send({
          message: 'Error retrieving Student with description with ' + request.params.word
        });
      }
    } else {
      response.send(dbResult);
    }
  });
};


exports.superiorDate = (request, response) => {
  Student.superiorDate(request.params.date, (error, dbResults) => {
    if(error){
      if(error.kind === 'not_found') {
        response.status(404).send({
          message: 'No Student born later than this ' + request.params.date
        });
      } else {
        response.status(500).send({
          message : 'Error retrieving infos from student.'
        })
      }
    } else {
      response.send(dbResults);
    }
  });
};

exports.order = (req,res) => {
  Student.order(req.params.order, (err,dbResults) => {
    if(err){
      if(err.kind === 'not_found') {
        res.status(404).send({
          message: 'No student found'
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving informations from order try ' + req.params.order
        })
      }
    } else {
      res.send(dbResults);
    }
  })
};

// Create a new student
exports.create = (request, response) => {
  if (!request.body) {
    return response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  // Create a Student
  const student = new Student({
    birthday: request.body.birthday ? request.body.birthday : null,
    description: request.body.description ? request.body.description : null,
    yearOld: request.body.yearOld ? request.body.yearOld : null,
    isSerious: request.body.isSerious ? request.body.isSerious : null,
  });

  // Save Student in the database
  Student.create(student, (error, data) => {
    if (error) {
      return response.status(500).send({
        message:
          error.message || 'Some error occurred while creating the Student.'
      });
    } else {
      return response.send(data);
    }
  });
};

// Update student
exports.update = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  Student.update(
    request.params.studentId,
    new Student({id: parseInt(request.params.studentId), ...request.body}),
    (error, data) => {
      if (error) {
        if (error.kind === 'not_found') {
          response.status(404).send({
            message: `Not found Student with id ${request.params.studentId}.`
          });
        } else {
          response.status(500).send({
            message: 'Error updating Student with id ' + request.params.studentId
          });
        }
      } else {
        response.send(data);
      }
    }
  );
};


exports.changeSerious = (request, response) => {
  if (!request.body) {
    response.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  Student.changeSerious(
    request.params.studentId,
    (error, data) => {
      if (error) {
        if (error.kind === 'not_found') {
          response.status(404).send({
            message: `Not found Student with id ${request.params.studentId}.`
          });
        } else {
          response.status(500).send({
            message: 'Error updating Student with id ' + request.params.studentId
          });
        }
      } else {
        response.send(data);
      }
    }
  );
};

exports.delete = (request, response) => {
  Student.delete(request.params.studentId, (error, dbResult) => {
    if (error) {
      if (error.kind === 'not_found') {
        response.status(404).send({
          message: `Not found Student with id ${request.params.studentId}.`
        });
      } else {
        response.status(500).send({
          message: 'Could not delete Student with id ' + request.params.studentId
        });
      }
    } else {
      response.send({message: `Student was deleted successfully!`});
    }
  });
};

exports.deleteSerious = (request, response) => {
  Student.deleteSerious((error, dbResult) => {
    if (error) {
      if (error.kind === 'not_found') {
        response.status(404).send({
          message: `Not found Student with id ${request.params.studentId}.`
        });
      } else {
        response.status(500).send({
          message: 'Could not delete Student with id ' + request.params.studentId
        });
      }
    } else {
      response.send({message: `Student was deleted successfully!`});
    }
  });
};
