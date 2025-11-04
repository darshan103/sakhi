import slugify from "slugify";
import productModel from "../models/productModel.js";
import fs from 'fs'

// create product controller
export const createProductController = async(req,res) => {
    try{
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        // validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is required"})
            case !description:
                return res.status(500).send({error:"Description is required"})
            case !price:
                return res.status(500).send({error:"Price is required"})
            case !category:
                return res.status(500).send({error:"Category is required"})
            case !quantity:
                return res.status(500).send({error:"Quantity is required"})
            case photo && photo.size > 1000000 :
                return res
                   .status(500)
                   .send({error:"Photo is required and should be less then 1mb"})
        }
        const products = new productModel({...req.fields, slug:slugify(name)})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"Product created successfully",
            products
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error while creating product"
        })
    }
}

// get product controller
export const getProductController = async(req,res) => {
    try{
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createAt:-1})
        res.status(200).send({
            success:true,
            total: products.length,
            message:"All products",
            products,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error while getting products",
            error
        })
    }
}

// get single controller
export const getSingleProductController = async(req,res) => {
    try {
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category');
        res.status(200).send({
            success:true,
            message:"single product fetch",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while getting single product",
            error
        })
    }
}

// get product photo controller
export const productPhotoController = async(req,res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error while getting product photo",
            error
        })
    }
}

// delete product controller
export const deleteProductController = async(req,res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:"Product deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while deleting product",
            error
        })
    }
}

// update product controller
export const updateProductController = async(req,res) => {
    console.log(req.files);
    try{
        const {name,slug,description,price,category,quantity,shipping} = req.fields;
        const {photo} = req.files;
        // validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is required"})
            case !description:
                return res.status(500).send({error:"Description is required"})
            case !price:
                return res.status(500).send({error:"Price is required"})
            case !category:
                return res.status(500).send({error:"Category is required"})
            case !quantity:
                return res.status(500).send({error:"Quantity is required"})
            case photo && photo.size > 1000000 :
                return res
                   .status(500)
                   .send({error:"Photo is required and should be less then 1mb"})
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields, slug:slugify(name)}, {new:true})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"Product updated successfully",
            products
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error while updating product"
        })
    }
}

// product filter controller
export const productFiltersController = async(req,res) => {
    try {
        const {checked, radio} = req.body;
        let args = {}
        if(checked.length > 0) args.category = checked
        if(radio.length) args.price = {$gte: radio[0], $lte: radio[1]}
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            error,
            message:"error while filtering product"
        })
    }
}

// product count controller
export const productCountController = async(req,res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            error,
            message:"error in product count"
        })
    }
}

// product list per page
export const productListController = async(req,res) => {
    try {
        const perPage = 2
        const page = req.params.page ? req.params.page: 1;
        const products = await productModel
          .find({})
          .select("-photo")
          .skip((page - 1)*perPage)
          .limit(perPage)
          .sort({createdAt: -1});
          res.status(200).send({
            success: true,
            products,
        });
    }catch(error) {
        console.log(error);
        res.status(400).send({
            success:false,
            error,
            message:"error while getting list per page",
        })
    }
}

// search product
export const searchProductController = async (req, res) => {
    try {
      const { keyword } = req.params;
      const resutls = await productModel
        .find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        })
        .select("-photo");
      res.json(resutls);
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
      });
    }
  };
  
  // similar products
  export const realtedProductController = async (req, res) => {
    try {
      const { pid, cid } = req.params;
      const products = await productModel
        .find({
          category: cid,
          _id: { $ne: pid },
        })
        .select("-photo")
        .limit(3)
        .populate("category");
      res.status(200).send({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error while geting related product",
        error,
      });
    }
  };
  
  // get product by catgory
  export const productCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      const products = await productModel.find({ category }).populate("category");
      res.status(200).send({
        success: true,
        category,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
      });
    }
  };