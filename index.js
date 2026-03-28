const express = require('express');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

// Create DB and Insert Questions
async function createDB() {
    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");

        const db = client.db('examdb');
        
        const cQuestions = [
    { qno: 1, question: "Which header file is required for the printf function?", options: ["<stdlib.h>", "<stdio.h>", "<math.h>", "<string.h>"], answer: "<stdio.h>" },
    { qno: 2, question: "What is the correct syntax to declare an integer variable in C?", options: ["integer a;", "int a;", "num a;", "var a;"], answer: "int a;" },
    { qno: 3, question: "What will be the output? int x = 5, y = 2; printf(\"%d\", x / y);", options: ["2.5", "2", "3", "Error"], answer: "2" },
    { qno: 4, question: "Which operator is used to get the address of a variable?", options: ["*", "&", "%", "@"], answer: "&" },
    { qno: 5, question: "Which loop executes at least once regardless of condition?", options: ["for", "while", "do-while", "None"], answer: "do-while" },
    { qno: 6, question: "Which format specifier is used for float?", options: ["%d", "%f", "%c", "%lf"], answer: "%f" },
    { qno: 7, question: "What will sizeof(char) return in C?", options: ["2", "1", "4", "Depends on system"], answer: "1" },
    { qno: 8, question: "In C, main() returns which type by default (modern standard)?", options: ["void", "int", "float", "char"], answer: "int" },
    { qno: 9, question: "Which function is used to find the length of a string?", options: ["strlen()", "size()", "strlength()", "len()"], answer: "strlen()" },
    { qno: 10, question: "Which symbol is used for single-line comments in C?", options: ["//", "#", "/* */", "--"], answer: "//" },
    { qno: 11, question: "What is the result of 5 % 2?", options: ["2.5", "1", "0", "2"], answer: "1" },
    { qno: 12, question: "What is the output of: int a = 3; printf(\"%d\", a++);", options: ["3", "4", "Error", "Undefined"], answer: "3" },
    { qno: 13, question: "Which statement is used to exit from a loop?", options: ["break", "stop", "return", "exit"], answer: "break" },
    { qno: 14, question: "Which function is used to allocate memory dynamically?", options: ["malloc()", "calloc()", "Both a and b", "realloc()"], answer: "Both a and b" },
    { qno: 15, question: "Which function reads a single character from the user?", options: ["scanf()", "getchar()", "gets()", "getc()"], answer: "getchar()" },
    { qno: 16, question: "Which keyword is used to define constants?", options: ["constant", "const", "define", "#define"], answer: "#define" },
    { qno: 17, question: "Which operator is used for pointer dereferencing?", options: ["*", "&", "->", "%"], answer: "*" },
    { qno: 18, question: "What is the default value of an uninitialized local variable in C?", options: ["0", "Garbage value", "NULL", "Depends"], answer: "Garbage value" },
    { qno: 19, question: "What will be the output? int a = 5; if (a = 0) printf(\"Zero\"); else printf(\"Non-zero\");", options: ["Zero", "Non-zero", "Error", "None"], answer: "Non-zero" },
    { qno: 20, question: "What does return 0; indicate in main()?", options: ["Program ended successfully", "Program failed", "No return value", "Program restarted"], answer: "Program ended successfully" }
];

        // C++ Questions Data
        const cppQuestions = [
    { qno: 1, question: "Which is the correct syntax to create an object in C++?", options: ["Car myCar;", "Car.myCar;", "new Car();", "create Car myCar;"], answer: "Car myCar;" },
    { qno: 2, question: "What will this code output? int a = 10; cout << ++a;", options: ["10", "11", "9", "Error"], answer: "11" },
    { qno: 3, question: "Which keyword is used for inheritance in C++?", options: ["inherits", "extends", ":", "->"], answer: ":" },
    { qno: 4, question: "Which of these is not a valid access specifier in C++?", options: ["public", "protected", "default", "private"], answer: "default" },
    { qno: 5, question: "What is the default value of an uninitialized int variable in C++?", options: ["0", "Garbage value", "Null", "None"], answer: "Garbage value" },
    { qno: 6, question: "Which operator is overloaded for object output in C++?", options: [">>", "<<", "->", "::"], answer: "<<" },
    { qno: 7, question: "Which function is always called when an object is created?", options: ["Constructor", "Destructor", "main", "init"], answer: "Constructor" },
    { qno: 8, question: "What is the size of 'bool' in C++?", options: ["1 byte", "2 bytes", "4 bytes", "Depends on system"], answer: "1 byte" },
    { qno: 9, question: "Which keyword is used to dynamically allocate memory in C++?", options: ["malloc", "alloc", "new", "create"], answer: "new" },
    { qno: 10, question: "What will this output? cout << (5 > 2 ? 5 : 2);", options: ["2", "5", "true", "false"], answer: "5" },
    { qno: 11, question: "Which function releases memory allocated by 'new'?", options: ["free", "delete", "remove", "clear"], answer: "delete" },
    { qno: 12, question: "Which concept allows using the same function name for different tasks?", options: ["Overloading", "Overriding", "Inheritance", "Encapsulation"], answer: "Overloading" },
    { qno: 13, question: "Which of these is a valid destructor name for class 'Test'?", options: ["destructor Test()", "~Test()", "delete Test()", "void Test()"], answer: "~Test()" },
    { qno: 14, question: "What will be the output? int x = 5; cout << x++;", options: ["6", "5", "Error", "Undefined"], answer: "5" },
    { qno: 15, question: "Which loop is best when the number of iterations is known?", options: ["for", "while", "do-while", "foreach"], answer: "for" },
    { qno: 16, question: "Which of these is not an OOP principle?", options: ["Polymorphism", "Encapsulation", "Abstraction", "Compilation"], answer: "Compilation" },
    { qno: 17, question: "Which operator is used to access class members using an object?", options: [".", "->", "*", "&"], answer: "." },
    { qno: 18, question: "Which of these is not a valid C++ data type?", options: ["string", "bool", "var", "wchar_t"], answer: "var" },
    { qno: 19, question: "Which feature allows a subclass to provide a specific implementation of a function?", options: ["Overloading", "Overriding", "Abstraction", "Virtualization"], answer: "Overriding" },
    { qno: 20, question: "What does 'friend' keyword do?", options: ["Makes a function a class member", "Grants access to private members", "Creates a copy of an object", "None"], answer: "Grants access to private members" }
];

        const javaQuestions = [
    { qno: 1, question: "Which of these is not a Java feature?", options: ["Object-oriented", "Use of pointers", "Portable", "Dynamic"], answer: "Use of pointers" },
    { qno: 2, question: "What is the extension of Java bytecode files?", options: [".class", ".java", ".exe", ".byte"], answer: ".class" },
    { qno: 3, question: "Which method is the entry point in a Java program?", options: ["start()", "main()", "run()", "init()"], answer: "main()" },
    { qno: 4, question: "Which keyword is used to inherit a class in Java?", options: ["extends", "implements", "inherits", "super"], answer: "extends" },
    { qno: 5, question: "Which package contains the Random class in Java?", options: ["java.util", "java.io", "java.net", "java.sql"], answer: "java.util" },
    { qno: 6, question: "Which of the following is not a Java primitive type?", options: ["int", "String", "char", "double"], answer: "String" },
    { qno: 7, question: "Which keyword is used to create a constant in Java?", options: ["static", "const", "final", "immutable"], answer: "final" },
    { qno: 8, question: "Which of the following is used to handle exceptions in Java?", options: ["try-catch", "throw-catch", "exception-catch", "error-handle"], answer: "try-catch" },
    { qno: 9, question: "Which Java keyword is used to define a subclass method that replaces a superclass method?", options: ["replace", "override", "overload", "super"], answer: "override" },
    { qno: 10, question: "Which of the following is the default value of a boolean in Java?", options: ["true", "false", "0", "null"], answer: "false" },
    { qno: 11, question: "Which operator is used to compare two values in Java?", options: ["==", "=", "!=", "equals"], answer: "==" },
    { qno: 12, question: "Which keyword is used to prevent method overriding?", options: ["static", "final", "private", "protected"], answer: "final" },
    { qno: 13, question: "What is the size of int in Java?", options: ["16 bits", "32 bits", "64 bits", "Depends on OS"], answer: "32 bits" },
    { qno: 14, question: "Which of these is a valid declaration of a char in Java?", options: ["char c = 'A';", "char c = \"A\";", "char c = A;", "char c = 'AB';"], answer: "char c = 'A';" },
    { qno: 15, question: "Which of these is used to create an object in Java?", options: ["alloc", "malloc", "new", "create"], answer: "new" },
    { qno: 16, question: "Which collection class allows null keys in Java?", options: ["Hashtable", "HashMap", "TreeMap", "LinkedHashMap"], answer: "HashMap" },
    { qno: 17, question: "Which method is used to start a thread in Java?", options: ["run()", "start()", "execute()", "init()"], answer: "start()" },
    { qno: 18, question: "Which of the following is a marker interface?", options: ["Serializable", "Comparable", "Runnable", "Cloneable"], answer: "Serializable" },
    { qno: 19, question: "Which keyword is used to call the parent class constructor?", options: ["super", "parent", "this", "base"], answer: "super" },
    { qno: 20, question: "Which of the following is used to read data from a file in Java?", options: ["FileReader", "FileInputStream", "Scanner", "All of the above"], answer: "All of the above" }
];

        const pythonQuestions = [
    { qno: 1, question: "What is the output of: type(5)?", options: ["int", "float", "str", "bool"], answer: "int" },
    { qno: 2, question: "Which of the following is a Python tuple?", options: ["[1, 2, 3]", "(1, 2, 3)", "{1, 2, 3}", "{'a':1}"], answer: "(1, 2, 3)" },
    { qno: 3, question: "Which keyword is used to define a function in Python?", options: ["function", "def", "func", "lambda"], answer: "def" },
    { qno: 4, question: "What will be the output of: print(2**3)?", options: ["6", "8", "9", "5"], answer: "8" },
    { qno: 5, question: "Which of the following is a Python dictionary?", options: ["[1,2,3]", "{'a':1, 'b':2}", "(1,2,3)", "{1,2,3}"], answer: "{'a':1, 'b':2}" },
    { qno: 6, question: "What is the default value of 'end' in print() function?", options: ["\\n", "space", "tab", "None"], answer: "\\n" },
    { qno: 7, question: "Which function is used to get the length of a list in Python?", options: ["count()", "size()", "len()", "length()"], answer: "len()" },
    { qno: 8, question: "Which of these is not a Python data type?", options: ["list", "tuple", "array", "dict"], answer: "array" },
    { qno: 9, question: "What is the output of: bool(0)?", options: ["True", "False", "None", "0"], answer: "False" },
    { qno: 10, question: "Which symbol is used for comments in Python?", options: ["//", "#", "/* */"], answer: "#" },
    { qno: 11, question: "Which method is used to add an item to a list?", options: ["add()", "append()", "insert()", "push()"], answer: "append()" },
    { qno: 12, question: "What is the output of: len('Python')?", options: ["5", "6", "7", "Error"], answer: "6" },
    { qno: 13, question: "Which keyword is used for loops in Python?", options: ["loop", "iterate", "for", "repeat"], answer: "for" },
    { qno: 14, question: "Which library is used for data analysis in Python?", options: ["NumPy", "Pandas", "Matplotlib", "Requests"], answer: "Pandas" },
    { qno: 15, question: "Which function converts a string to lowercase?", options: ["lower()", "down()", "tolower()", "case()"], answer: "lower()" },
    { qno: 16, question: "What will be the output of: 10 // 3?", options: ["3", "3.33", "4", "Error"], answer: "3" },
    { qno: 17, question: "Which of the following is a valid variable name?", options: ["1var", "var_1", "var-1", "var 1"], answer: "var_1" },
    { qno: 18, question: "Which module in Python supports regular expressions?", options: ["regex", "pyregex", "re", "express"], answer: "re" },
    { qno: 19, question: "What will be the output of: 'a' * 3?", options: ["aaa", "a3", "Error", "3a"], answer: "aaa" },
    { qno: 20, question: "Which statement is used to exit a loop in Python?", options: ["exit", "break", "stop", "quit"], answer: "break" }
];

        // Insert only if empty
        if (await db.collection("C").countDocuments() === 0) {
            await db.collection("C").insertMany(cQuestions);
            console.log(" C questions inserted");
        }
        if (await db.collection("Java").countDocuments() === 0) {
            await db.collection("Java").insertMany(javaQuestions);
            console.log(" Java questions inserted");
        }
        if (await db.collection("Python").countDocuments() === 0) {
            await db.collection("Python").insertMany(pythonQuestions);
            console.log(" Python questions inserted");
        }
        if (await db.collection("C++").countDocuments() === 0) {
            await db.collection("C++").insertMany(cppQuestions);
            console.log(" C++ questions inserted");
        }

    } catch (e) {
        console.error(" Error creating DB:", e);
    }
}


//PAGE 1
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page1.html'));
});

app.get('/page1.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page1.html'));
});

app.post('/Page2', (req, res) => {
    const { name, branch, year } = req.body;
    if (!name || !branch || !year) return res.redirect('/page1.html');

    res.redirect(`/page2.html?name=${encodeURIComponent(name)}&branch=${encodeURIComponent(branch)}&year=${encodeURIComponent(year)}`);
});

//Page2 
app.get('/page2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page2.html'));
});

//  EXAM PAGE
app.get('/exam', async (req, res) => {
    try {
        const db = client.db('examdb');
        const lang = req.query.language || 'Java';
        const studentName = (req.query.name || '').trim();
        const studentBranch = (req.query.branch || '').trim();
        const studentYear = (req.query.year || '').trim();

        if (!studentName || !studentBranch || !studentYear) {
            return res.redirect('/page1.html');
        }

        const questions = await db.collection(lang)
            .aggregate([{ $sample: { size: 10 } }])
            .toArray();

        res.render('examPage', { lang, questions, studentName, studentBranch, studentYear });
    } catch (e) {
        console.error(e);
        res.send("Error loading exam page");
    }
});

//  SCORE PAGE
app.post("/score", async (req, res) => {
    try {
        const db = client.db("examdb");
        const { name, branch, lang, year } = req.body;

        let qIds = req.body['qIds[]'] || req.body.qIds || [];
        if (!Array.isArray(qIds)) qIds = [qIds];

        const hex24 = /^[a-fA-F0-9]{24}$/;
        const validIds = qIds.filter(id => hex24.test(id));

        if (!validIds || validIds.length === 0) {
            return res.status(400).send('No valid question ids');
        }

        let objIds = validIds.map(id => new ObjectId(id));

        if (objIds.length === 0) {
            const possibleIds = Object.keys(req.body || {}).filter(k => hex24.test(k));
            objIds = possibleIds.map(id => new ObjectId(id));
        }

        const questions = await db.collection(lang).find({ _id: { $in: objIds } }).toArray();

        let score = 0, attempted = 0;
        const details = [];

        questions.forEach(q => {
            const qid = q._id.toString();
            const selected = req.body[qid];
            if (selected) attempted++;
            if (selected === q.answer) score++;
            details.push({ question: q.question, selected, correct: q.answer });
        });

        const total = questions.length;
        const result = score < 4 ? "Fail" : "Pass";

        const insertRes = await db.collection("students").insertOne({
            name, branch, lang, marks: score, attempted, total, result, details, createdAt: new Date()
        });

        res.render("scorePage", { name, branch, score, total, attempted, studentId: insertRes.insertedId });
    } catch (e) {
        console.error("/score error:", e);
        res.status(500).send("Error processing score");
    }
});

//  ADMIN VIEW 
app.get('/view', async (req, res) => {
    try {
        const db = client.db('examdb');
        const students = await db.collection("students").find({}).toArray();
        
        students.forEach(s => s.result = (typeof s.marks === 'number' && s.marks < 4) ? "Fail" : "Pass");

        
        const statsObj = {};
        students.forEach(s => {
            const lang = s.lang || 'Unknown';
            if (!statsObj[lang]) statsObj[lang] = { Pass: 0, Fail: 0, total: 0 };
            const isPass = s.result === 'Pass';
            if (isPass) statsObj[lang].Pass++;
            else statsObj[lang].Fail++;
            statsObj[lang].total++;
        });

        res.render('adminView', { students, statsObj });
    } catch (e) {
        console.error(e);
        res.send("Error loading admin view");
    }
});

//  STUDENT DASHBOARD 
app.get('/student/:id', async (req, res) => {
    try {
        const db = client.db('examdb');
        const id = req.params.id;
        const hex24 = /^[a-fA-F0-9]{24}$/;
        if (!hex24.test(id)) return res.status(400).send('Invalid student id');

        const student = await db.collection('students').findOne({ _id: new ObjectId(id) });
        if (!student) return res.status(404).send('Student not found');

        res.render('profileDashboard', { student });
    } catch (e) {
        console.error('/student/:id error', e);
        res.status(500).send('Error loading student dashboard');
    }
});


app.get('/api/student/:id', async (req, res) => {
    try {
        const db = client.db('examdb');
        const id = req.params.id;
        const hex24 = /^[a-fA-F0-9]{24}$/;
        if (!hex24.test(id)) return res.status(400).json({ error: 'Invalid id' });

        const student = await db.collection('students').findOne({ _id: new ObjectId(id) });
        if (!student) return res.status(404).json({ error: 'Not found' });
        res.json(student);
    } catch (e) {
        console.error('/api/student/:id error', e);
        res.status(500).json({ error: 'Server error' });
    }
});

// Debug JSON route - list all students
app.get('/api/students', async (req, res) => {
    try {
        const db = client.db('examdb');
        const students = await db.collection('students').find({}).sort({ createdAt: -1 }).toArray();
        res.json(students);
    } catch (e) {
        console.error('/api/students error', e);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(3000, async () => {
    console.log("🚀 Server started on http://localhost:3000");
    await createDB();
});
