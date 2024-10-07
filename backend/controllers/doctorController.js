import doctorModel from "../models/doctorModel.js";




const changeAvailablity = async (req,res,next) => {
  try {
    
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({success:true,message:'Availablity Changed'})


  } catch (error) {
      console.log(error);
      next(error);
  }
}



const doctorList = async (req,res,next) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"])
    
    res.json({ success: true, doctors });
  } catch (error) {
    next(error)
  }
}

export {changeAvailablity,doctorList}











