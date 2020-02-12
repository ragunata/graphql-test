const models = require('./models');
const fs = require('fs');
var datetime = require('node-datetime');
const base64_to_file = ({ image_data, file_type, file_dir }) => {  //Common function for base64 to image conversion
    var file_type = file_type
    var dt = datetime.create();
    var formatted = dt.format('Y-m-d-H-M-S');
    var rand_number = Math.floor(Math.random() * 1000);
    var file_name = formatted + "-" + rand_number + "." + file_type
    var file_dir = file_dir
    if (!fs.existsSync(file_dir)) {
        fs.mkdirSync(file_dir);   //create file directory if directory not exist
    }
    var file_path = file_dir + file_name;
    fs.writeFile(file_path, image_data, 'base64', async function (err) {   //write file form base 64 to image
        if (err) {
            console.log(err);
        }
    });
    return {   // return file details
        success: true,
        data: {
            "file_name": file_name,
            "file_path": file_path.replace(".","")
        }
    };
}
const getAgents = async (args) => {   //Agents list function
    // const page = args.page;
    const page = 1;
    const agents = await models.agents.findAll({
        offset: (page - 1) * 10,
        limit: 1000
    });
    const totalAgents = await models.agents.count();  //Get total count
    return {
        agents,
        page,
        totalAgents
    };
}
const addAgents = async (args) => {  //Add agents details
    console.log(args)
    const { name, email, contact_number, address, zip_code, avatar_image_dir, license_image_dir } = args.input;
    var file_dir = './images/'
    
    var avatar_image = avatar_image_dir.split(",");
    var image_data = avatar_image[1]
    var file_type_data = avatar_image[0].split("/")[1]
    var file_type = file_type_data.split(";")[0]
    var avatar_image_dir_data = await base64_to_file({ image_data, file_type, file_dir })  //avatar image base 64 to image
    var avatar_image_dir_name = avatar_image_dir_data.data.file_path
    
    var license_image = license_image_dir.split(",");
    image_data = license_image[1]
    var file_type_data = license_image[0].split("/")[1]
    var file_type = file_type_data.split(";")[0]
    var license_image_dir_data = await base64_to_file({ image_data, file_type, file_dir })  //license image base 64 to image
    var license_image_dir_name = license_image_dir_data.data.file_path


    const agents = await models.agents.create({   //add new agent
        "name": name,
        "email": email,
        "contact_number": contact_number,
        "address": address,
        "zip_code": zip_code,
        "avatar_image_dir": avatar_image_dir_name,
        "license_image_dir": license_image_dir_name
    })
    return agents;
}
module.exports = { getAgents, addAgents };