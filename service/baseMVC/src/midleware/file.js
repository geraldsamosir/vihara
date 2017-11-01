//classs for set multer storage config
var multer = require('multer')

//storage
module.exports =
    class fileuploader {
        storages(folderpath, filetype) {
            return multer.diskStorage({
                destination: folderpath,

                filename: function(req, file, cb) {
                    let newname = file.fieldname + '-' + Date.now() + filetype
                    file.newname = newname
                    cb(null, newname)


                }
            })
        }

        //handle array image upload
        upload_any(params) {
            let strg = this.storages(params.folderpath, params.filetype)
            let _any = multer({ storage: strg })
            return _any.any()
        }

        //handle single image upload
        upload_single(params) {
            let strg = this.storages(params.folderpath, params.filetype)
            let _single = multer({ storage: strg })
            return _single.single(params.fieldname)
        }

    }