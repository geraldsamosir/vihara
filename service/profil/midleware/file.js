const {Basefile} = require("baseMvc")


module.exports = new(
    class profilfile extends Basefile {
        constructor() {
            super()
            this.conf = {
                folderpath: './public/images/profile/',
                filetype: '.png',
                fieldname: 'photo',
                url : "/images/profile/"
            }
        }
        env() {
            return this.conf
        }

        getfilename(req, res, next) {
            if (req.file.originalname) {
                req.body.photo  = '/images/profile/' + req.file.newname
            }
            next();
        }

    }
)