import Feature from "../models/Feature.js";

//add image
const addFeatureImage = async (req, res) => {
    try {
        const { image } = req.body;

        console.log("Image : ",image);

        const featureImages = new Feature({
            image,
        })

        await featureImages.save()

        res.status(201).json({
            success: true,
            message: "✅ Success."
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "❌Some ERR is occured."
        })   
    }
}

//get all images
const getFeatureImages = async (req, res) => {
    try {
        const images = await Feature.find({});

        res.status(200).json({
            success: true,
            data: images,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some ERR is occured."
        })
    }
}

//delete a image
const deleteFeatureImage = async (req,res) => {
    try {
        const { id } = req.params;
    
        const deleted = await Feature.findByIdAndDelete(id);
    
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "❎ Some ERR is occured."
            })
        }
    
        res.status(200).json({
            success: true,
            message: "✅ Deleted Successfull."
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "❎ Someting went wrong :("
        })
    }
}

export {
    addFeatureImage,
    getFeatureImages,
    deleteFeatureImage
}