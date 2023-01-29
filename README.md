
# Psychiatrists (Backend)

This project is a demo project for showing skills in NodeJS and Express. 
The following project have details about hospitals, doctors (psychiatrists) and their repective patients.



## Tech Stack & Libraries

**Backend:** NodeJS, Express

**Database:** MySQL

**API Platform:** [Postman](https://www.postman.com/satellite-geoscientist-62925635/workspace/psychiatrists/collection/23310420-cda1305c-f54a-4c0a-b3a4-d2a7cb5bf799?action=share&creator=23310420)

**Libraries:**

* `express`: It is a backend application framework used to create a server on NodeJS and create RestAPIs
* `mysql2`: mysql2 is used instead of mysql because of its various features such as 
    - Better Performance
    - Promise Wrapper
    - Pooling
    and various others
* `cors`: This library is used to prevent Cross-Origin Error and to allow easy sharing of data across various domains
* `multer`: This library is used to parse multipart/form-data and store images in the server
* `dotenv`: It is used as a dev-dependency as it would be removed in production. This library is used to read the .env file specified in the application folder and to easy read config variables.
## Installation and Running Locally

Install this application via *git* and run it locally on your machine using *npm* and *node*

#### Pre-requisites: 
* mysql, node and git installed
* create an `.env` file in root directory of project and create [following](#environment-variable) environment variables accordingly


```bash
  git clone https://github.com/shad0w-cat/psychiatrists-nodejs-mysql.git
  cd psychiatrists-nodejs-mysql
  npm install
  npm start
```
#### Environment Variable

To run this project, you will need to add the following environment variables to your .env file

`SERVER_PORT`

`DB_HOST`

`DB_PORT`

`DB_USERNAME`

`DB_PASSWORD`

`DB_NAME`

`DB_SERVER`
## API Reference

#### Create Patient

```http
  POST /patient/
```

**Body**

`Content-Type: multipart/form-data`

| Key | Value     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | Patient Name (**Required**) |
| `address` | `string` | Patient Address (>=10 characters) (**Required**) |
| `email` | `string` | Patient Email (**Required**) |
| `phone` | `string` | Patient Phone (with prefix +91) (**Required**) |
| `password` | `string` | Password (min 8 max 15 with atleast 1 uppercase 1 lowercase and 1 digit) (**Required**) |
| `image` | `file` | Patient Photo (**Required**) |

#### Hospital Details (GET)

```http
  GET /hospital/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of hospital to fetch |


#### Hospital Details (POST) [^1]

```http
  POST /hospital/
```

**Body**

`Content-Type: multipart/form-data`

| Key | Value     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of hospital to fetch |


Link for POSTMAN COLLECTION :

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/23310420-cda1305c-f54a-4c0a-b3a4-d2a7cb5bf799?action=collection%2Ffork&collection-url=entityId%3D23310420-cda1305c-f54a-4c0a-b3a4-d2a7cb5bf799%26entityType%3Dcollection%26workspaceId%3D157b71d7-eca4-4c41-b61a-185f06f6e893)

[^1]: 2 similar apis were created with get and post due to unclear instructions.
## Authors

- [shad0w-cat](https://github.com/shad0w-cat)


## License

[MIT](https://choosealicense.com/licenses/mit/)

