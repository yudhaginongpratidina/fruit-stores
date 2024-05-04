// LIBRARIES
const express = require("express");
const router = express.Router();


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
router.post("/brands/add", BrandController.store);
router.get("/brands/delete/:id", BrandController.destroy);
router.get("/brands/update/:id", BrandController.show);
router.post("/brands/update/:id", BrandController.update);
// =====================================================================================================================

// EXPORT
module.exports = router