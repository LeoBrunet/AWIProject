$(document).ready(function() {
	const scrollContainer = document.getElementById("banner");
	/*if(scrollContainer) {
	  const maxValue = (scrollContainer.offsetWidth * (3/4) * 2) - scrollContainer.offsetWidth * (1/4)
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      if (scrollContainer.scrollLeft + evt.deltaY < maxValue) {
        scrollContainer.scrollLeft += evt.deltaY;
      } else {
        scrollContainer.scrollLeft = maxValue;
      }
    });
  }*/

	/* ADAPT TEXT SIZE OF RECIPE TITLE (MAX LENGTH 100 letters)*/
	const bannerTitles = document.getElementsByClassName("banner-title");
	for (var i = bannerTitles.length - 1; i >= 0; i--) {
		const length = bannerTitles[i].innerHTML.length;
		if(length > 30){
			bannerTitles[i].style = "font-size: 1.5vw;"
		}
		if(length > 60){
			bannerTitles[i].style = "font-size: 1.3vw;"
		}
	}

	/* ADAPT TEXT RECIPE DESCRIPTION (MAX LENGTH 100 letters)*/
	const bannerDescs = document.getElementsByClassName("banner-desc");
	const recipeDescs = document.getElementsByClassName("recipe-desc");
	var descs = Array.prototype.concat.call(bannerDescs, recipeDescs);
	for (var i = descs.length - 1; i >= 0; i--) {
		for (var j = descs[i].length - 1; j >= 0; j--) {
		const length = descs[i][j].innerHTML.length;
		if (i === 0 && length > 100) {
			descs[i][j].innerHTML = descs[i][j].innerHTML.substr(0, 99) + "...";
		} else if (i === 1 && length > 100) {
			descs[i][j].innerHTML = descs[i][j].innerHTML.substr(0, 80) + "...";
		}
	}
	}


	/* ADAPT MARGIN */
	const catImgs = document.getElementsByClassName("category-img");
	const catTexts = document.getElementsByClassName("category-text");
	for (var i = catTexts.length - 1; i >= 0; i--) {
		const height = catTexts[i].offsetHeight;
		const heightInVW = (height/window.innerWidth)*100;

		if (heightInVW > 1.1) {
			catImgs[i].style = "margin-top: 20%;";
		}
	}
});
