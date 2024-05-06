const { Fruit, Brand, Category } = require('../models');
const path = require("path");
const fs = require("fs");

class FruitController {

    // MENAMPILKAN SEMUA DATA FRUIT DI HALAMAN HOME
    // ==============================================================================
    static async home (req, res) {
        try {

            // QUERY DATA CATEGORY, BRAND, FRUIT
            // =================================================
            const categories = await Category.findAll();
            const brands = await Brand.findAll();

            // QUERY DATA FRUIT LIMIT 4 DESC
            const fruits = await Fruit.findAll({
                limit: 4,
                order: [["updatedAt", "DESC"]]
            })


            res.render('index', { categories, brands, fruits });
        } catch (error) {
            console.log(error.message);
        }
    }

    // MENAMPILKAN SEMUA DATA FRUIT DI HALAMAN FRUITS
    // ==============================================================================
    static async index (req, res) {
        try {

            // QUERY DATA CATEGORY, BRAND, FRUIT
            // =================================================
            const categories = await Category.findAll();
            const brands = await Brand.findAll();
            const fruits = await Fruit.findAll();


            res.render('fruit/index', { categories, brands, fruits });
        } catch (error) {
            console.log(error.message);
        }
    }


    // MENAMPILKAN FORM CREATE FRUIT
    // ==============================================================================
    static async create (req, res) {
        try {

            // QUERY DATA CATEGORY DAN BRAND
            // =================================================
            const categories = await Category.findAll();
            const brands = await Brand.findAll();

            res.render('fruit/create', { categories, brands });
        } catch (error) {
            console.log(error.message);
        }
    }


    // MENYIMPAN DATA FRUIT
    // ==============================================================================
    static async store (req, res) {
        try {
            const { name, price, stock, category_id, brand_id } = req.body;
            const image = req.file;
            const imagePath = image ? image.filename : null;

            // console.log(name, price, stock, category_id, brand_id, imagePath);

            const fruitNameExists = await Fruit.findOne({ where: { name } });
            if (fruitNameExists) {
                res.render('error', { error: 'Fruit name already exists' });
            } else {
                await Fruit.create({ name, price, stock, category_id, brand_id, image: imagePath });
                res.redirect('/fruits');
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    // MENAMPILKAN FORM UPDATE FRUIT
    // ==============================================================================
    static async show (req, res) {
        try {
            const { id } = req.params;

            // QUERY DATA CATEGORY, BRAND, FRUIT BY ID
            // =================================================
            const categories = await Category.findAll();
            const brands = await Brand.findAll();
            const fruit = await Fruit.findByPk(id);

            res.render('fruit/update', { categories, brands, fruit });
        } catch (error) {
            console.log(error.message);
        }
    }


    // UPDATE DATA FRUIT BY ID
    // ==============================================================================
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name, price, stock, category_id, brand_id } = req.body;
            const image = req.file;
            const imagePath = image ? image.filename : null;
    
            const fruitToUpdate = await Fruit.findByPk(id);
    
            if (!fruitToUpdate) {
                return res.status(404).send("Fruit not found");
            }
    
            if (imagePath) {
                // HAPUS GAMBAR LAMA
                if (fruitToUpdate.image) {
                    fs.unlinkSync(path.join(__dirname, '..', 'public', 'images', fruitToUpdate.image));
                }
            }
    
            // UPDATE DATA FRUIT
            await fruitToUpdate.update({ name, price, stock, category_id, brand_id, image: imagePath });
    
            res.redirect('/fruits');
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
    

    // HAPUS DATA FRUIT BY ID
    // ==============================================================================
    static async destroy(req, res) {
        try {
            const { id } = req.params;
            await Fruit.destroy({ where: { id } });
            res.redirect('/fruits');
        } catch (error) {
            console.log(error.message);
        }
    }

}

module.exports = FruitController