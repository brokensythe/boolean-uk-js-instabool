// - You can use the same repo from yesterday's exercise
// - If you haven't fully completed yesterday's part, use Nico's review from this morning as a stepping point
// - Have the like button adding 1 like to the respective counter each time you click it, and display the changes
// - Have the comments form to add another comment to the respective post, and display the changes
// - The data must be persisted in the server so that when you refresh the page it doesn't go away

// write your code here
const imageContainer = document.querySelector(".image-container")


function createImage (image) {
    
    // top level article
    let imageCard = document.createElement("article")
    imageCard.setAttribute("class", "image-card")
    
    imageContainer.append(imageCard)
    
    // children of the article
    let imageTitle = document.createElement("h2")
    imageTitle.setAttribute("class", "title")
    imageTitle.innerText = image.title
    
    let screenImage = document.createElement("img")
    screenImage.setAttribute("class", "image")
    screenImage.setAttribute("src", image.image)
    
    let likesSection = document.createElement("div")
    likesSection.setAttribute("class", "likes-section")
    
    let commentsEl = document.createElement("ul")
    commentsEl.setAttribute("class", "comments")
    
    let commentsForm = document.createElement("form")
    commentsForm.setAttribute("class", "comment-form")
    
    imageCard.append(imageTitle, screenImage, likesSection, commentsEl, commentsForm)
    
    // children of likes section
    let likes = document.createElement("span")
    likes.setAttribute("class", "likes")
    likes.innerText =  `${image.likes} likes`
    
    let likeButton = document.createElement("button")
    likeButton.setAttribute("class", "like-button")
    likeButton.innerText = "❤"
    likeButton.addEventListener("click", () => fetch(`http://127.0.0.1:3000/images/${image.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ likes: image.likes += 1})
        }
        )
        .then( (response) => response.json() )
        .then( (update) => likes.innerText = `${update.likes} likes` )
        )

    likesSection.append(likes, likeButton)
    
    // children of the comments
    fetch("http://127.0.0.1:3000/comments")
        .then(function (response) {
            return response.json()
        })
        .then(function (comments) {
            for (const comment of comments) {
                if (comment.imageId===image.id) {
                    const commentEl = document.createElement("li")
                    commentEl.innerText = comment["content"]
                    commentsEl.append(commentEl)
                }
            }
        })
    
    // children of the form
    let commentInput = document.createElement("input")
    commentInput.setAttribute("class", "comment-input")
    commentInput.setAttribute("type", "text")
    commentInput.setAttribute("name", "comment")
    commentInput.setAttribute("placeholder", "Add a comment...")
    
    let commentButton = document.createElement("button")
    commentButton.setAttribute("class", "comment-button")
    commentButton.setAttribute("type", "submit")
    commentButton.innerText = "Post"
    
    commentsForm.append(commentInput, commentButton)
}

// run fetch
fetch("http://127.0.0.1:3000/images")
    .then(function (response) {
        return response.json()
    })
    .then(function (images) {
        for (const image of images) {
            createImage(image)
        }
    })
    