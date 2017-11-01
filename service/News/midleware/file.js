const {Basefile} = require("baseMvc")


module.exports = new(
    class postfile extends Basefile {
        constructor() {
            super()
            this.conf = {
                folderpath: './public/images/news/',
                filetype: '.png',
                fieldname: 'bannerphoto',
                url : "/images/news/"
            }
        }
        env() {
            return this.conf
        }

        getfilename(req, res, next) {
            if (req.file.originalname) {
                req.body.bannerphoto = '/images/news/' + req.file.newname
            }
            next();
        }

    }
)