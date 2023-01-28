const mysql = require("mysql2/promise");
const { DB_HOST } = require("../config/default");
const config = require('../config/default');

// Initialize Database
function initDB() {
    let createHospitalTable = "create table if not exists hospital (id int auto_increment not null, `name` varchar(100) not null, primary key(id));";

    let createPatientTable = "create table if not exists patients (id int auto_increment not null, `name` varchar(20) not null, address text not null, email varchar(255) not null, phone varchar(13) not null, password varchar(15) not null, image text not null, primary key(id));";

    let createDoctorTable = "create table if not exists psychiatrist (id int auto_increment not null, `name` varchar(20) not null, hospital int not null, primary key(id), foreign key (hospital) references hospital(id));";

    let createDoctorPatientTable = "create table if not exists doctor_patient (id int auto_increment not null, doctorId int not null, patientId int not null, primary key (id), foreign key (doctorId) references psychiatrist(id), foreign key (patientId) references patients(id));";

    query(createHospitalTable);
    query(createDoctorTable);
    query(createPatientTable);
    query(createDoctorPatientTable);
}

function sampleData() {
    query(`insert into hospital (name) values 
    ("Apollo Hospitals"), 
    ("Jawaharlal Nehru Medical College and Hospital"), 
    ("Indira Gandhi Institute of Medical Sciences (IGIMS)"), 
    ("AIIMS - All India Institute Of Medical Science");`);

    query(`insert into patients (name, address, email, phone, password, image) values 
    ("Karan Bashu", "A Rajiv Chowk, New Delhi A", "karanbashu@gmail.com", "+919999999999", "Karanbashu123", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"),
    ("Jakie Hills", "B Rajiv Chowk, New Delhi B", "jakiehills@gmail.com", "+919999999998", "Jakiehills234", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"),
    ("Justin Blue", "C Rajiv Chowk, New Delhi C", "justinblue@gmail.com", "+919999999997", "JustinBlue345", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"),
    ("Prema Patil", "D Rajiv Chowk, New Delhi D", "premapatil@gmail.com", "+919999999996", "Premapatil456", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"),
    ("Paramjeet D", "E Rajiv Chowk, New Delhi E", "paramjeetd@gmail.com", "+919999999995", "Paramjeetd567", "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"),
    ("Charu Ratan", "F Rajiv Chowk, New Delhi F", "charuratan@gmail.com", "+919999999994", "Charuratan678", "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"),
    ("Aashi Patel", "G Rajiv Chowk, New Delhi G", "aashipatel@gmail.com", "+919999999993", "AashiPatel789", "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"),
    ("Jaya Nehkra", "H Rajiv Chowk, New Delhi H", "jayanekhra@gmail.com", "+919999999992", "Jayanekhra890", "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"),
    ("Aashu Kapur", "I Rajiv Chowk, New Delhi I", "aashukapur@gmail.com", "+919999999991", "AashuKapur901", "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("Blake Tokos", "J Rajiv Chowk, New Delhi J", "blaketokos@gmail.com", "+919999999910", "Blaketokos012", "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("Lily Anthem", "K Rajiv Chowk, New Delhi K", "lilyanthem@gmail.com", "+919999999920", "Lilyanthem147", "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("Kajol Kashi", "L Rajiv Chowk, New Delhi L", "kajolkashi@gmail.com", "+919999999930", "Kajolkashi258", "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("Mira Takshi", "M Rajiv Chowk, New Delhi M", "miratakshi@gmail.com", "+919999999940", "MiraTakshi369", "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("Om Takeshee", "N Rajiv Chowk, New Delhi N", "omtakeshee@gmail.com", "+919999999950", "Omtakeshee159", "https://images.unsplash.com/photo-1496360166961-10a51d5f367a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("Tripti Domo", "O Rajiv Chowk, New Delhi O", "triptidomo@gmail.com", "+919999999960", "TriptiDomo357", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("Taran Aashu", "P Rajiv Chowk, New Delhi P", "taranaashu@gmail.com", "+919999999970", "Taranaashu444", "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("Java Jordan", "Q Rajiv Chowk, New Delhi Q", "javajordan@gmail.com", "+919999999980", "Javajordan333", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("White Black", "R Rajiv Chowk, New Delhi R", "whiteblack@gmail.com", "+919999999990", "WhiteBlack222", "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("Bily Whites", "S Rajiv Chowk, New Delhi S", "bilywhites@gmail.com", "+919999999888", "Bilywhites111", "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"),
    ("Tofu Player", "T Rajiv Chowk, New Delhi T", "tofuplayer@gmail.com", "+919999999777", "Tofuplayer000", "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60");`);

    query(`insert into psychiatrist (name, hospital) values 
    ("M Mathur", 1),
    ("D Thakur", 1),
    ("S Pallavi", 1),
    ("A Rana", 1),
    ("D Rathur", 1),
    ("F Gazeda", 2),
    ("H Jolie", 2),
    ("T Orion", 2),
    ("R Rajput", 2),
    ("N Johnson", 2),
    ("P Batra", 3),
    ("S Patel", 3),
    ("GR Rajuman", 3),
    ("TK Thane", 3),
    ("V Thane", 3),
    ("C Vanktesh", 4),
    ("RF Thapa", 4),
    ("Jolie Jules", 4),
    ("Ralph T", 4),
    ("AB Panu", 4);`);

    query(`insert into doctor_patient (doctorId, patientId) values 
    (1,1),
    (1,2),
    (1,3),
    (1,4),
    (2,5),
    (3,6),
    (4,7),
    (5,8),
    (6,9),
    (7,10),
    (8,11),
    (9,12),
    (10,13),
    (11,14),
    (12,15),
    (13,16),
    (14,17),
    (15,18),
    (16,19),
    (17,20);`);
}

async function query(sql, params) {
    try {
        const connection = await mysql.createConnection({
            host: config.DB_HOST,
            port: config.DB_PORT,
            user: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
            multipleStatements: true
        });
        const [results,] = await connection.query(sql, params);
        return results;
    }
    catch (error) {
        console.log(error.message)
        return false;
    }
}

module.exports = {
    initDB,
    sampleData,
    query
}