window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  var confettiScript = document.createElement('script');
confettiScript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js');
document.head.appendChild(confettiScript);
}

window.Script2 = function()
{
  var confettiScript = document.createElement('script');
confettiScript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js');
document.head.appendChild(confettiScript);
}

window.Script3 = function()
{
  function CreateInput(dataAttr, storylineVariable, options = {}) {
    var player = GetPlayer();
    var setVar = player.SetVar;
    const selectElement = document.querySelector(`div[data-acc-text='${dataAttr}']`);

    if (!selectElement) {
        console.error(`Element with data-acc-text='${dataAttr}' not found.`);
        return;
    }

    const input = document.createElement('input');
    const inputId = `input-${storylineVariable}`;
    input.id = inputId;

    input.style.width = '100%';
    input.style.height = '100%';
    input.style.boxSizing = 'border-box';
    input.style.backgroundColor = options.backgroundColor || 'white';
    input.style.color = options.textColor || 'black';
    input.style.border = options.border || '1px solid black';
    input.style.fontSize = options.fontSize || '13px';

    input.type = options.type || 'text';

    if (options.placeholder) {
        input.placeholder = options.placeholder;
    }

    if (options.defaultValue !== undefined) {
        input.value = options.defaultValue;
        setVar(storylineVariable, options.defaultValue);
    }

    selectElement.appendChild(input);

 

    input.addEventListener('input', function() {
        const value = input.value;
        setVar(storylineVariable, value);
        
    });

    input.addEventListener('blur', function() {
        const value = input.value;
        setVar(storylineVariable, value);
        
    });
}


CreateInput('Title', 'Title', {
	type: 'text',
	placeholder: 'Title',
    backgroundColor: 'white',
    textColor: 'black',
    border: 'none',
    fontSize: '28px',
    defaultValue: ''
});
}

window.Script4 = function()
{
  function CreateInput(dataAttr, storylineVariable, options = {}) {
    var player = GetPlayer();
    var setVar = player.SetVar;
    const selectElement = document.querySelector(`div[data-acc-text='${dataAttr}']`);

    if (!selectElement) {
        console.error(`Element with data-acc-text='${dataAttr}' not found.`);
        return;
    }

    const textarea = document.createElement('textarea');
    const textareaId = `textarea-${storylineVariable}`;
    textarea.id = textareaId;

    textarea.style.width = '100%';
    textarea.style.height = '100%';
    textarea.style.boxSizing = 'border-box';
    textarea.style.resize = 'none';
    textarea.style.backgroundColor = options.backgroundColor || 'white';
    textarea.style.color = options.textColor || 'black';
    textarea.style.border = options.border || '1px solid black';
    textarea.style.fontSize = options.fontSize || '13px';

    // Set the default value if provided
    if (options.defaultValue !== undefined) {
        textarea.value = options.defaultValue;
        setVar(storylineVariable, options.defaultValue);
    }

    // Set the placeholder text if provided
    if (options.placeholder !== undefined) {
        textarea.placeholder = options.placeholder;
    }

    selectElement.appendChild(textarea);

    textarea.addEventListener('input', function() {
        setVar(storylineVariable, textarea.value);
    });

    textarea.addEventListener('blur', function() {
        setVar(storylineVariable, textarea.value);
    });
}

// Example usage with placeholder
CreateInput('Editor', 'Editor', {
    backgroundColor: 'white',
    textColor: 'black',
    border: 'none',
    fontSize: '18px',
    defaultValue: '',
    placeholder: 'Enter your text here...'
});

}

window.Script5 = function()
{
  setVar("Title","");
setVar("Editor","");
}

window.Script6 = function()
{
  // Get the value of the "Title" variable
var title = GetPlayer().GetVar("Title");

// Get the value of the "Editor" variable
var editor = GetPlayer().GetVar("Editor");

// Create a new Blob object
var blob = new Blob([editor], { type: 'text/plain' });

// Create a new anchor element for the download link
var downloadLink = document.createElement("a");

// Set the download link attributes
downloadLink.download = title + ".txt";
downloadLink.innerHTML = "Download File";

// Set the href attribute to the URL of the Blob object
downloadLink.href = window.URL.createObjectURL(blob);

// Append the download link to the document body
document.body.appendChild(downloadLink);

// Click the download link to initiate the download
downloadLink.click();

// Remove the download link from the document body
document.body.removeChild(downloadLink);

}

window.Script7 = function()
{
  // Get the value of the "Title" variable
var title = GetPlayer().GetVar("Title");

// Get the value of the "Editor" variable
var editor = GetPlayer().GetVar("Editor");

// Create a new Blob object
var blob = new Blob([editor], { type: 'application/msword' });

// Create a new anchor element for the download link
var downloadLink = document.createElement("a");

// Set the download link attributes
downloadLink.download = title + ".doc";
downloadLink.innerHTML = "Download File";

// Set the href attribute to the URL of the Blob object
downloadLink.href = window.URL.createObjectURL(blob);

// Append the download link to the document body
document.body.appendChild(downloadLink);

// Click the download link to initiate the download
downloadLink.click();

// Remove the download link from the document body
document.body.removeChild(downloadLink);

}

window.Script8 = function()
{
  var player = GetPlayer();

// Get the value of the "Title" variable
var title = player.GetVar("Title");

// Get the value of the "Editor" variable
var editor = player.GetVar("Editor");

// Create a new jsPDF object
var pdf = new jsPDF();

// Set the document name to the value of the "Title" variable
pdf.setProperties({
  title: title,
});

// Calculate the width and height of the page
var pageWidth = pdf.internal.pageSize.getWidth();
var pageHeight = pdf.internal.pageSize.getHeight();

// Set title font properties
pdf.setFont('Roboto', 'bold');
pdf.setFontSize(30);

// Calculate the height of the title text
var titleHeight = pdf.getTextDimensions(title).h;

// Set the initial y position for the title
var titleY = 20;

// Write the title
pdf.text(title, pageWidth / 2, titleY, 'center');

// Set description font properties
pdf.setFont('Roboto', 'normal');
pdf.setFontSize(16);

// Calculate the available space for description
var availableSpace = pageHeight - titleY - titleHeight - 20; // Adjust for margins

// Split the editor text into lines based on the available space
var lines = pdf.splitTextToSize(editor, pageWidth - 20);

// Set the initial y position for the description
var descriptionY = titleY + titleHeight + 10;

// Loop through the lines
for (var i = 0; i < lines.length; i++) {
  // If the line would exceed the height of the page, add a new page
  if (descriptionY + 10 > pageHeight) {
    pdf.addPage();
    descriptionY = 10;
  }

  // Insert the line into the document
  pdf.text(lines[i], 10, descriptionY);

  // Update the y position
  descriptionY += 10; // Adjust for line spacing
}

// Save the PDF document
pdf.save(title + ".pdf");

}

};
