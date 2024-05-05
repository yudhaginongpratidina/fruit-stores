const { Brand } = require("../models");
const path = require("path");
const fs = require("fs");


class BrandController {


    static async index(req, res) {
        try {
            // QUERy DATA BRAND YANG TERBARU
            const brands = await Brand.findAll({ order: [["updatedAt", "DESC"]] });

            res.render("brand/index", { brands });
        } catch (error) {
            console.log(error.message);
        }
    }



    static create(req, res) {
        try {
            res.render("brand/create");
        } catch (error) {
            console.log(error.message);
        }
    }



    static async store(req, res) {
        try {
            const { name, city } = req.body;
            const image = req.file;
            const imagePath = image ? image.filename : null;

            // NAMA SUDAH ADA
            const nameExists = await Brand.findOne({ where: { name } });
            if (nameExists) { res.render("error", { error: nameExists.name + " already exists" });}

            // // NAMA BELUM ADA
            await Brand.create({ 
                name, 
                city, 
                image: imagePath
            });
            res.redirect("/brands");
        } catch (error) {
            console.log(error.message);
        }
    }


    static async show(req, res) {
        try {
            const { id } = req.params;
            const brand = await Brand.findByPk(id);
            res.render("brand/update", { brand });
        } catch (error) {
            console.log(error.message);
        }
    }


    static async update(req, res) {
        try {
            
            const { id } = req.params;
            const { name, city } = req.body;
            const image = req.file;
            const imagePath = image ? image.filename : null;

            // CEK
            // ============================================
            // console.log(id);
            // console.log(name);
            // console.log(city);
            // console.log(imagePath);


            //  CEK IMAGE SAMA ATAU TIDAK
            // ============================================
            const brandImageSame = await Brand.findByPk(id);
            if (imagePath === null) {
                
                //  UPDATEDATA NAMA DAN CITY SAJA
                // ============================================
                await Brand.update({ name, city }, { where: { id: Number(id) } });
                res.redirect("/brands");
            } else {
                // HAPUS GAMBAR LAMA
                // ============================================
                const imagePathOld = brandImageSame.image;
                if (imagePathOld) {
                    fs.unlinkSync(path.join(__dirname, `../public/images/${imagePathOld}`));
                }
                
                // UPDAT DATA NAMA, CITY, BESERTA GAMBAR
                // ============================================
                await Brand.update({ name, city, image: imagePath }, { where: { id: Number(id) } });

                // REDIRECT
                res.redirect("/brands");
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    static async destroy(req, res) {
        try {
            const { id } = req.params;

            const brand = await Brand.findByPk(id);
            const imagePath = brand.image;

            // HAPUS GAMBAR
            if (imagePath) {
                fs.unlinkSync(path.join(__dirname, `../public/images/${imagePath}`));
            }

            // HAPUS DATA
            await Brand.destroy({ where: { id: Number(id) } });
            res.redirect("/brands");
        } catch (error) {
            console.log(error.message);
        }
    }

}


module.exports = BrandController