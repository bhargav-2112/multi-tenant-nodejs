# multi-tenant-nodejs

# poslevel_be
poslevel_be

# sequelize cli-init
npx sequelize-cli init

# sequelize commands to create migration file
npx sequelize-cli model:generate --name MerchantHeadquarter --attributes isActive:boolean,accountId:integer,agentId:integer,contactName:string,contactEmail:string,contactPhone:string,companyName:string,address1:string,address2:string,city:string,state:string,postalCode:string,numberOfLocations:integer,source:string,dateAdded:date,notes:date,isWelcomeEmailSend:boolean,locations:integer

# sequelize commands to run migration file
npx sequelize-cli db:migrate --name <file_name>

# undoing sequelize migration
npx sequelize-cli db:migrate:undo

# sequelize command to create seed 
npx sequelize-cli seed:generate --name demo-user

<!-- This command will create a seed file in seeders folder. File name will look something like XXXXXXXXXXXXXX-demo-user.js. It follows the same up / down semantics as the migration files. -->

# running seeds
npx sequelize-cli db:seed:all

# undoing seeds
npx sequelize-cli db:seed:undo
