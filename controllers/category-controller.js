const { Category } = require("../models");

class CategoryController {
    // MENAMPILKAN SEMUA DATA CATEGORY
    // ==============================================================================
    static async index(req, res) {
        try {
            const categories = await Category.findAll();
            res.render("category/index", { categories })
        } catch (error) {
            console.log(error.message)
        }
    }


    // MENAMPILKAN FORM CREATE CATEGORY
    // ==============================================================================
    static async create(req, res) {
        try {
            res.render("category/create")
        } catch (error) {
            console.log(error.message)
        }
    }

    // MENYIMPAN DATA CATEGORY
    // ==============================================================================
    static async store(req, res) {
        try {
            const { name } = req.body;

            const nameExists = await Category.findOne({ where: { name } });

            // JIKA SUDAH ADA DATANYA
            if (nameExists) {
                res.render("error", { error: name + " already exists" })
            } 

            await Category.create({ name });
            res.redirect("/categories")
        } catch (error) {
            console.log(error.message)
        }
    }


    // MENAMPILKAN FORM UPDATE CATEGORY
    // ==============================================================================
    static async show(req, res) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);
            res.render("category/update", { category })
        } catch (error) {
            console.log(error.message)
        }
    }


    // MENGUPDATE DATA CATEGORY BERDASARKAN ID
    // ==============================================================================
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            await Category.update({ name }, { where: { id } });
            res.redirect("/categories");
        } catch (error) {
            console.log(error.message)
        }
    }

    // HAPUS DATA CATEGORY BERDASARKAN ID
    // ==============================================================================
    static async destroy(req, res) {
        try {
            const { id } = req.params;
            await Category.destroy({ where: { id } });
            res.redirect("/categories");
        } catch (error) {
            console.log(error.message)
        }
    }
}


module.exports = CategoryController