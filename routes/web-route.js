// LIBRARIES
const express = require("express");
const router = express.Router();
const path = require("path");


// MIDDLEWARE UPLOAD IMAGE BRAND
const uploadImageBrand = require("../middleware/image-brand");

// IMPORT CONTROLLERS
const BrandController = require("../controllers/brand-controller");

// =====================================================================================================================
// DEFINING ROUTES FOR BRAND
// ----------------------------------------------------------------------------------------------------------------------
// GET	/brands	            Menampilkan semua brands yang ada dalam database
// GET	/brands/add	        Menampilkan halaman form untuk menambahkan data brands
// POST	/brands/add	        Menerima data yang dikirim dari halaman /brands/add untuk melakukan insertion
// GET	/brands/delete/:id	Melakukan delete data brands berdasarkan id yang dikirimkan
// GET	/brands/update/:id	Menampilkan halaman form untuk mengubah data brands dari Id
// POST	/brands/update/:id	Menerima data yang dikirim dari halaman /brands/update/:id untuk melakukan update
// ----------------------------------------------------------------------------------------------------------------------

router.get("/brands", BrandController.index);
router.get("/brands/add", BrandController.create);
router.post("/brands/add", uploadImageBrand.single("image") ,BrandController.store);
router.get("/brands/update/:id", BrandController.show);
router.post("/brands/update/:id", uploadImageBrand.single("image") , BrandController.update);
router.get("/brands/delete/:id", BrandController.destroy);
// =====================================================================================================================



// =====================================================================================================================
// DEFINING ROUTES FOR CATEGORIES
// ----------------------------------------------------------------------------------------------------------------------
// GET	/categories	            Menampilkan semua categories yang ada dalam database
// GET	/categories/add	        Menampilkan halaman form untuk menambahkan data categories
// POST	/categories/add	        Menerima data yang dikirim dari halaman /categories/add untuk melakukan insertion
// GET	/categories/delete/:id	Melakukan delete data categories berdasarkan id yang dikirimkan
// GET	/categories/update/:id	Menampilkan halaman form untuk mengubah data categories dari Id
// POST	/categories/update/:id	Menerima data yang dikirim dari halaman /categories/update/:id untuk melakukan update
// ----------------------------------------------------------------------------------------------------------------------




// =====================================================================================================================
// UNTUK AKSES GAMBAR DARI FOLDER PUBLIC MELALUI URL
// ----------------------------------------------------------------------------------------------------------------------
router.get("/images/:image", (req, res) => {
    const { image } = req.params
    res.sendFile(path.join(__dirname, `../public/images/${image}`))
})
// =====================================================================================================================




// =====================================================================================================================
// HALAMAN NOT FOUND
// ----------------------------------------------------------------------------------------------------------------------
router.get("/*", (req, res) => {
    const { url } = req
    res.render("error", { error: `Halaman ${url} tidak ditemukan` });
})
// =====================================================================================================================




// EXPORT
module.exports = router