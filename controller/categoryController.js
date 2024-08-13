
import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"


export const createCategoryController = async(req,res) =>{
    try {
        
        const {name} = req.body
        if(!name){
            return res.status(401).json({
                success: false,
                error,
                message: `Name is required`
            })    
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).json({
                success: false,
                error,
                message: `${name} category already exists !!`
            })
        }
        const category = await new categoryModel({name,slug: slugify(name)})
        await category.save()

        return res.status(201).json({
            success: true,
            message: `Category ${name} created successfully`,
            category
        })

    } catch (error) {
        console.error(error.message || error)
        return res.status(500).json({
            success: false,
            error,
            message: `Server Error occured in creating category ${error}`
        })
    }
}

export const updateCategoryController = async(req,res) => {
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true})

        return res.status(201).json({
            success: true,
            message: `Category ${name} successfully updated`,
            category
        })

    } catch (error) {
        console.error(error.message || error)
        return res.status(500).json({
            success: false,
            error,
            message: `Server Error occured in updating category ${error}`
        })
    }
}

export const categoryController = async(req,res) =>{
    try {
        
        const category = await categoryModel.find({})
        return res.status(200).json({
            success: true,
            message: 'All categories',
            category
        })

    } catch (error) {
        console.error(error.message || error)
        return res.status(500).json({
            success:false,
            error,
            message: `Server Error occured in getting all categories`
        })
    }
}

export const singleCategoryController = async(req,res) =>{
    try {
        const {slug} = req.params
        const category = await categoryModel.findOne({slug})
        if(!category){
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Single category',
            category
        })
    }catch(error){
        console.error(error.message || error)
        return res.status(500).json({
            success: false,
            message: `Server Error occured in getting single category`
        })
    }
}

export const deleteCategoryController = async(req,res) =>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: 'Category deleted successfully'
        })
    } catch (error) {
        console.error(error.message || error)
        return res.status(500).json({
            success: false,
            message: `Server Error occured in deleting category ${error}`
        })
    }
 
}