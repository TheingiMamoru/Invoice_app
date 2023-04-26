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

const invoiceForm = document.querySelector("#invoiceForm");
const selectService = document.querySelector("#selectService");
const quantity = document.querySelector("#quantity");
const invoiceLists = document.querySelector("#invoiceLists");

//function
const createTr =(service, quantity) => {
    const tr = document.createElement("tr");
    const total = service.price * quantity;
    tr.innerHTML = `
        <td>${service.title}</td>
        <td class="text-end">${quantity}</td>
        <td class="text-end">${service.price}</td>
        <td class="text-end list-total">${total}</td>
    `;
    return tr;
}

const findTax = (amount, percentage = 5) => {
    return amount * (percentage/100);
    
}

const findTotal = () => {
    const listTotal = document.querySelectorAll(".list-total");
    let subTotal = [... listTotal].reduce(
        (pv, cv) => pv + parseFloat(cv.innerText),0
        );
    console.log(subTotal);

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

    invoiceLists.append(createTr(selectedService, quantity.valueAsNumber))

    findTotal();

    invoiceForm.reset();
})

