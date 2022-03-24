const { v4: uuidv4 } = require('uuid');
class User{
    constructor(
        {id,
        name,
        dob,
        email,
        image,
        currentLocation,
        preferedLocation,
        currentSalary,
        expectedSalary,
        noticePeriod,
        about,
        skills=[],
        workExperience=[],
        certificatin=[],
        education=[]}
        ){
            this.id=id
            this.name=name
            this.dob=dob
            this.email=email
            this.image=image
            this.currentLocation=currentLocation
            this.preferedLocation=preferedLocation
            this.currentSalary=currentSalary
            this.expectedSalary=expectedSalary
            this.noticePeriod=noticePeriod
            this.about=about
            this.skills=skills
            this.workExperience=workExperience
            this.certificatin=certificatin
            this.education=education
            this.salt=uuidv4()
        }
}
module.exports = User