//variables

const services = [
    {
        id:1,
        title:"Domain Service",
        price:15
    },
    {
        id:2,
        title:"Hosting Service",
        price:30
    },
    {
        id:3,
        title:"Web Design Service",
        price:150
    },
    {
        id:4,
        title:"Maintence Service",
        price:300
    }
]

//selectors
const app = document.querySelector("#app");
const invoiceForm = document.querySelector("#invoiceForm");
const selectService = document.querySelector("#selectService");
const quantity = document.querySelector("#quantity");
const invoiceLists = document.querySelector("#invoiceLists");
const subTotal = document.querySelector("#subTotal");
const tax = document.querySelector("#tax");
const total = document.querySelector("#total");
const listTable = document.querySelector("#listTable");

//function
const createTr =(service, quantity) => {
    const tr = document.createElement("tr");
    tr.classList.add("list");
    tr.setAttribute("service-id", service.id); 
    const total = service.price * quantity;
    tr.innerHTML = `
        <td class="d-flex justify-content-between align-items-center">
            ${service.title}
            <i class="fa-solid fa-trash-can text-danger del-btn"></i>
        </td>
        <td class="text-end list-quantity">${quantity}</td>
        <td class="text-end">${service.price}</td>
        <td class="text-end list-total">${total}</td>
    `;
    return tr;
}

const calculatedTax = (amount, percentage = 5) => {
    return amount * (percentage/100);
    
}

const findTotal = () => {
    const listTotal = document.querySelectorAll(".list-total");
    let subTotalCalculated = [... listTotal].reduce(
        (pv, cv) => pv + parseFloat(cv.innerText),0
        );
    subTotal.innerText = subTotalCalculated;
    tax.innerText = calculatedTax(subTotalCalculated);
    total.innerText = subTotal.innerText + tax.innerText ;
    // console.log(subTotalCalculated);
    }

//table ထဲမှာ list ရှိ/မရှိ စစ်တာ
const showTable = () => {
    if(invoiceLists.children.length){
        listTable.classList.remove("d-none");
    }else{
        listTable.classList.add("d-none");

    }
}

//loop
services.forEach(service => 
    selectService.append(new Option(service.title, service.id))
);

//data collect from form 
invoiceForm.addEventListener("submit", e => {
    e.preventDefault();
    // console.log(
    //     selectService.value, 
    //     quantity.valueAsNumber,
    //     services.find(service => service.id == selectService.value)
    // );

    const selectedService = services.find(
        service => service.id == selectService.value
    );
    
    // console.log(selectedService);

    //check for duplicate
    const isExistedService = [...invoiceLists.children].find(
        (el) => el.getAttribute("service-id") == selectedService.id
    );

    if(isExistedService){
        console.log("it's existed.");
        console.log(isExistedService);
        const existedQuantity = isExistedService.querySelector(".list-quantity");
        existedQuantity.innerText = parseFloat(existedQuantity.innerText) + quantity.valueAsNumber;
        isExistedService.querySelector(".list-total").innerText = existedQuantity.innerText * selectedService.price;

    }else{
        invoiceLists.append(createTr(selectedService, quantity.valueAsNumber))
    }


    findTotal();

    invoiceForm.reset();
    showTable();
})

app.addEventListener("click", event => {
    const currentElement = event.target;
    if(currentElement.classList.contains("del-btn")){
        //delete function here
        currentElement.closest("tr").remove();
        findTotal();
        showTable();
    }
    // console.log(currentElement);
})


