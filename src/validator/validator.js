function validBody(data){
  return Object.keys(data).length > 0;     
}

function validId(id){
  return mongoose.Types.ObjectId.isValid(id)
}

function validName(name){
  return /^[A-Za-z ]{1,20}$/.test(name)
}

function validPhone(phone){
  return /^[0]?[6789]\d{9}$/.test(phone)
}

function validMail(email){
  return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
}

function validPassword(password){
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(password)
}


function validtitle(title){
  return /^[A-Za-z ]{1,20}$/.test(title)
}


module.exports = {validBody , validId , validName , validPhone , validMail , validPassword , validtitle}