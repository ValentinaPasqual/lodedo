// MOVE TO TOP THE SELECTED ITEMS IN THE FACETS
function moveToTop(checkbox) {
    // Get the parent <ul> element
    var ul = checkbox.closest('ul');
    // Get the <li> element containing the checkbox
    var listItem = checkbox.closest('li');
    // Move the <li> element to the top of the <ul>
    ul.insertBefore(listItem, ul.firstChild);
}

// Function to check and hide the dropdown if it has no elements
var dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(function(dropdown) {
     var dropdownMenu = dropdown.querySelector('.dropdown-menu');

     if (dropdownMenu.children.length === 0) {
         dropdown.style.display = 'none';
     } else {
         dropdown.style.display = 'inline-block'; // Use 'inline-block' to match Bootstrap styling
     }
 });


 // Function to filter content in the artwork page - auto interpretations
 function filterContent(filterURI) {
     const catalogItems = document.querySelectorAll('.symbol-interpretation');

     catalogItems.forEach(item => {
         const catalogURIs = item.getAttribute('data-catalog-uris');
         var button = item.querySelector('a');
         var badge = item.querySelector('.badge');

         // Check if filterURI exists in the item's catalog URIs
         if (catalogURIs.includes(filterURI)) {
           // Add the 'show-item' class and remove 'hide-item' class
           item.classList.add('card-enabled');
           item.classList.remove('card-disabled');
           button.classList.add('d-1');
           badge.classList.add('bg-warning');
           button.classList.add('btn-outline-dark');
           badge.classList.remove('bg-warning-disabled');
           button.classList.remove('d-1-disabled');
           button.classList.remove('btn-outline-disabled');
         } else {
           // Add the 'hide-item' class and remove 'show-item' class
           item.classList.add('card-disabled');
           item.classList.remove('card-enabled');
           button.classList.add('d-1-disabled');
           button.classList.add('btn-outline-disabled');
           badge.classList.add('bg-warning-disabled');
           button.classList.remove('d-1');
           button.classList.remove('btn-outline-dark');
           badge.classList.remove('bg-warning');

         }
     });
 }

 // Attach click event listeners to filter buttons
 const filterButtons = document.querySelectorAll('.preico-filter');
 filterButtons.forEach(button => {
     button.addEventListener('click', () => {
         const filterURI = button.getAttribute('data-filter-uri');
         filterContent(filterURI);
     });
 });


// SEARCH FILTER IN facets
function searchFilterFunction(inputField) {
  var filter, ul, ul_id, li, i, txtValue;
  filter = inputField.value.toUpperCase();
  ul = inputField.nextElementSibling;
  ul_id = ul.id
  li = ul.querySelectorAll("li");

  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

const choiceArray = document.querySelectorAll(".choice")

choiceArray.forEach((card) => {
    card.addEventListener("click", () => {
        choiceArray.forEach((element) => {
            element.classList.remove("expand", "unset")
            element.classList.add('small')
        })
        card.classList.remove("small")
        card.classList.add('expand')
    });
});


// GOOGLE ANALYTICS

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-73SQ61K2RE');
