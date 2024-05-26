import express from "express"

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
function generateID() {
    return Math.floor(Math.random() * 10000);
}

app.get('/', (req, res) => {
    res.render("homePage.ejs", {
        blogList : blogList,
    });
})

app.get('/aboutPage', (req, res) => {
    res.render("aboutPage.ejs");
})

app.get('/createBlogPage', (req, res) => {
    res.render("createBlogPage.ejs");
})

app.get('/viewPostPage/:id', (req, res) => {
    const blogId = req.params.id;
    const blogDetails = blogList.find((blog) => blog.id===parseInt(blogId));
    res.render("viewPostPage.ejs", {
        blogDetails: blogDetails,
    });
})

app.get('/updatePostPage/:id', (req, res) => {
    const blogId = req.params.id;
    const blogDetails = blogList.find((blog) => blog.id===parseInt(blogId));
    res.render("updatePostPage.ejs", {
        blogDetails: blogDetails,
    });
})

let blogList = [];
app.post("/submit", (req, res) => {
    const blogTitle = req.body.bTitle;
    const blogDescription = req.body.bDes;
    blogList.push({
        id: generateID(),
        title: blogTitle,
        description: blogDescription,
    });
    res.redirect("/");
})

app.post("/updatePostPage/:id", (req, res) => {
    const blogId = req.params.id;
    const editBlog = blogList.findIndex((blog)=>blog.id===parseInt(blogId));
    if(editBlog===-1){
        res.send("<h1>Something went wrong</h1>");
    }
    const updatedTitle = req.body.bTitle;
    const updatedDescription = req.body.bDes;
    blogList[editBlog].title = updatedTitle;
    blogList[editBlog].description = updatedDescription;
    res.redirect("/");
})

app.post("/delete/:id", (req, res) => {
    const blogId = req.params.id;
    blogList = blogList.filter((blog)=>blog.id!==parseInt(blogId));
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Listening from port ${port}`);
})
