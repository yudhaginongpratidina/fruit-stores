// LIBRARIES
const express = require("express");
const router = express.Router();
const path = require("path");


// MIDDLEWARE UPLOAD IMAGE BRAND
const uploadImageBrand = require("../middleware/image-brand");
const uploadImageFruit = require("../middleware/image-fruit");

// IMPORT CONTROLLERS
const BrandController = require("../controllers/brand-controller");
const CategoryController = require("../controllers/category-controller");
const FruitController = require("../controllers/fruit-controller");

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
router.get("/categories", CategoryController.index);
router.get("/categories/add", CategoryController.create);
router.post("/categories/add", CategoryController.store);
router.get("/categories/delete/:id", CategoryController.destroy);
router.get("/categories/update/:id", CategoryController.show);
router.post("/categories/update/:id", CategoryController.update);



// =====================================================================================================================
// DEFINING ROUTES FOR FRUITS
// ----------------------------------------------------------------------------------------------------------------------
// GET	/fruits	            Menampilkan semua fruit yang ada dalam database
// GET	/fruits/add	        Menampilkan halaman form untuk menambahkan data fruit
// POST	/fruits/add	        Menerima data yang dikirim dari halaman /fruits/add untuk melakukan insertion
// GET	/fruits/delete/:id	Melakukan delete data fruit berdasarkan id yang dikirimkan
// GET	/fruits/update/:id	Menampilkan halaman form untuk mengubah data fruit dari Id
// POST	/fruits/update/:id	Menerima data yang dikirim dari halaman /fruits/update/:id untuk melakukan update
// ----------------------------------------------------------------------------------------------------------------------
router.get("/fruits", FruitController.index);
router.get("/fruits/add", FruitController.create);
router.post("/fruits/add", uploadImageFruit.single("image"), FruitController.store);
router.get("/fruits/delete/:id", FruitController.destroy);
router.get("/fruits/update/:id", FruitController.show);
router.post("/fruits/update/:id", uploadImageFruit.single("image"), FruitController.update);





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