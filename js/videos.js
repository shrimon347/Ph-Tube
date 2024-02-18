const loadCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  const videos = data.data;
  //console.log(videos);
  displayCategoriesButton(videos);
};

const displayCategoriesButton = (categories) => {
  const linkContainer = document.getElementById("link-container");
  //console.log(categories);

  categories.forEach((category) => {
    const buttonDiv = document.createElement("div");
    buttonDiv.innerHTML = `
    <a onclick="handlelink('${category.category_id}')"
    class="mr-5 hover:text-gray-900 hover:bg-gray-200 rounded cursor-pointer bg-gray-100 border-0 py-2 px-5 focus:outline-none"
    >
      ${category.category}
    </a>
    
    `;
    linkContainer.append(buttonDiv);
  });
};

const videoCard = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.textContent = "";
  if(videos.length === 0) {
    const videoCard = document.createElement("div");
    videoCard.classList = "col-span-full"
    videoCard.innerHTML = `
       <div >
       <img class="mx-auto" src="assests/Icon.png">
       <p class="text-3xl font-semibold">Sorry! There is  no data here</p>
       </div>
    `
    videoContainer.appendChild(videoCard)
  }

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.classList = "card w-full bg-base-100 shadow-xl";

    const postedDate = new Date(parseInt(video.others.posted_date) * 1000); // Convert to milliseconds

    const hours = Math.floor(postedDate / (1000 * 60 * 60));
    const minutes = Math.floor((postedDate / (1000 * 60)) % 60);
    let timeElapsed = "";
    if (hours > 0) {
      timeElapsed += `${hours}hr `;
    }
    if (minutes > 0) {
      timeElapsed += `${minutes}min ago`;
    }
    
    
    video.authors.forEach((author) => {
      videoCard.innerHTML = ` 
  <figure class="relative"><img class="w-full h-[200px]" src="${
              video.thumbnail
            }" alt="Shoes" /> 
      <span class="bg-black text-white absolute px-3 bottom-3 right-3">${
        timeElapsed ? timeElapsed : ""
      }</span>  
      </figure>
      <div class="card-body">
            <div class="flex gap-10">
            <img src="${
              author.profile_picture
            }" alt="ProfilePic" class="w-10 h-10 rounded-full">
  
            <div class="space-y-2">
            <p class="text-xl font-bold">${video.title}</p>
            <div class="flex gap-3">
            <span>${author.profile_name}</span>
            <img src="${
              author.verified ? "assests/verified.svg" : ""
            }" >          
            </div>
            <p class="views"><span>${video.others.views}</span> views</p>
            </div>
          </div>
          </div>`
      ;

      videoContainer.appendChild(videoCard);
    });
  });
};
const handlelink = async (category_id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${category_id}`
  );
  const data = await res.json();
  if ((data.status = true)){
    const videos = data.data
    videoCard(videos);
    console.log(videos);
  }
};

const sort = ()=>{
  const videoContainer = document.getElementById('video-container');
  const videos = Array.from(videoContainer.children);

  videos.sort((a, b) => {
      const viewsA = parseInt(a.querySelector('.views').innerText);
      const viewsB = parseInt(b.querySelector('.views').innerText);
      return viewsB - viewsA;
  });

  videos.forEach(video => videoContainer.appendChild(video));
}
handlelink(1000);
loadCategories();

