function moveToTop(checkbox) {
    // Get the parent <ul> element
    var ul = checkbox.closest('ul');
    // Get the <li> element containing the checkbox
    var listItem = checkbox.closest('li');
    // Move the <li> element to the top of the <ul>
    ul.insertBefore(listItem, ul.firstChild);
}
