# Freelance Code 

<br />

<h3 align="center">Freelance Code</h3>

 <p align="center">
   Find freelance services from our CodeOp Bootcamp alumni network
  </p>


## About The Project

![Freelance Code Homescreen](https://user-images.githubusercontent.com/112785177/225439471-eb4ab708-0f66-4188-b781-04f40604b6ad.png)

An application where people can access full stack, data science, and product management freelance services. 

On this web application you can browse freelancers by category, skillset, price, or location as a client. Or if you are a freelancer, you can make an account and upload images, a cv, and link your accounts that showcase your work. 


### Built With

* Next.js
* MySQL 
* Tailwind
* Multer 

### Design 

![Web app sketch](https://user-images.githubusercontent.com/112785177/225447081-7165cc57-8e76-4df5-acde-3e8a4f56314d.png)

![dbschema](https://user-images.githubusercontent.com/112785177/225446467-1f573d26-956e-43d2-9758-4c641ca6f574.png)

Currently we will be using one database with two tables. 

One table will store the account details of the freelancer and the other table will store information about their services. Their documents will be saved to a local folder and the path names will be stored in the database. 

![Web page flow and plan](https://user-images.githubusercontent.com/112785177/225441832-2b92a909-d107-4278-a90b-422d44530808.png)
![Screen Shot 2023-03-15 at 10 03 43 PM](https://user-images.githubusercontent.com/112785177/225442007-90c9e748-af94-430d-8039-ac91e4dbbf12.png)
This is the plan of the web app that outlines the flow of data in more detail. 

## Getting started

### Installations 

- Run `npm install` in project directory to install client and server-related dependencies.

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database: `create database freelance_code`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=products
  DB_PASS=YOURPASSWORD
  SUPER_SECRET=YOURPASSWORD
  
```

- Run `npm run migrate` in this repository, in a new terminal window. This will create a table called 'user_table' and 'services' in your database.



### Start

Run npm run dev or yarn dev or pnpm dev to start the development server on http://localhost:3000

Visit http://localhost:3000 to view your application

## Improvements 

## Issues

Feel free to submit issues and enhancement requests.
 

## Contributing

Contributions are welcome!

If you have a suggestion that would improve the project, please fork the repo and create a pull request. 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add some NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## Feature ideas:

* Using a location API to select location  
* Add Pagination 
* Build a community page where people can comment on the freelancer's work
* User accounts for clients
* payment system 

## Contact

Golde Tischler - [LinkedIn Profile](www.linkedin.com/in/golde-tischler) [Github Profile](www.github.com/goldet) - golde.tischler@gmail.com <br/>
Katja Pollmann - [LinkedIn Profile](www.linkedin.com/in/katja-pollmann-613989a7) [Github Profile](https://github.com/kpo18)- katjapollmann@hotmail.com <br/>
Shuani van der Horst - [LinkedIn Profile](https://www.linkedin.com/in/shauni-van-der-horst-1905571ba/) [Github Profile](https://github.com/Shaunivdh)- shaunivanderhorst@gmail.com

