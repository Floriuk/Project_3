let canvas = document.getElementById('myChart');


// Create the chart
let ctx = canvas.getContext('2d');
let myChart = new Chart(ctx, {
  type: 'line',
  data: {
    // labels: Object.keys(line_data),
    labels:["a"],
    datasets: [{
      label: 'Example Dataset',
      // data: Object.values(line_data),
      data: [10],
      borderColor: 'rgba(0, 123, 255, 1)',
      fill: false
    }]
  },
  options: {
    responsive: true
  }
});

d3.json('http://127.0.0.1:5000/api/v1.0/sales').then(salesData=>{
d3.json('http://127.0.0.1:5000/api/v1.0/product').then(productData=>{
d3.json('http://127.0.0.1:5000/api/v1.0/crop').then(cropData=>{
d3.json('http://127.0.0.1:5000/api/v1.0/client').then(clientData=>{

// Get Regions
let regions = new Set(clientData.map(d=>d.region))
regions = Array.from(regions)
d3.select('#user_regions').selectAll('option').data(regions).enter().append('option').attr('value', d=>d).text(d=>d)
/// ---------------------
function main(){

  // In 'this.value' we carry the user selection....
  let user_choice = d3.select('#user_regions').property("value")
  console.log(user_choice)
  let clientData_filtered = clientData.filter(d=>d.region==user_choice)
  let client_ids = clientData_filtered.map(d=>d.client_id)

  //  Filter Sales
  let salesData_filtered = []
  for (let i = 0; i < client_ids.length; i++) {
    let client_i = client_ids[i]
    for (let t = 0; t < salesData.length; t++) {
      let salesData_t = salesData[t]
      if(salesData_t.client_id==client_i){
        salesData_filtered.push(salesData_t)
      } 
    }
  }

  let product_ids = salesData_filtered.map(d=>d.product_id)
  // productData
  let productData_sorted = {}
  productData.forEach(d=>{
      productData_sorted[d.product_id] = d
  })
  let productData_filtered = product_ids.map(d=>productData_sorted[d])

  // Group sales data by product ID and calculate the sum of sales
  let groupedSales = salesData_filtered.reduce((acc, curr) => {
    const { product_id, sales } = curr;
    if (acc[product_id]) {
      acc[product_id] += sales;
    } else {
      acc[product_id] = sales;
    }
    return acc;
  }, {});

  // Map product ID to product name
  const productNames = {};
  productData_filtered.forEach(prod => { // Changed variable name to 'prod'
    const { product_id, product } = prod;
    productNames[product_id] = product;
  });

  // Prepare data for the pie chart
  let labels = Object.keys(groupedSales).map(product_id => productNames[product_id]);
  let values = Object.values(groupedSales);

  // Create the pie chart using Plotly
  const data = [{
    values: values,
    labels: labels,
    type: 'pie'
  }];
  const layout = {
    title: 'Sales by Product',
  };

  Plotly.newPlot('pie-chart', data, layout);


  let bar_data={}
for (let i = 1; i < 59; i++) {
  let sub_sales_2 = salesData_filtered.filter(d=>d.month==i)
  let sales_sum_2 = sub_sales_2.reduce((acc, curr)=>acc+curr.sales,0)
  bar_data[i]=sales_sum_2
}
  var data_2 = [
    {
      x: Object.keys(bar_data),
      y: Object.values(bar_data),
      type: 'bar'
    }
  ];
  
  Plotly.newPlot('bar-chart', data_2);



  // Get the canvas element
let line_data={}
for (let i = 1; i < 13; i++) {
  let sub_sales = salesData_filtered.filter(d=>d.month==i)
  let sales_sum = sub_sales.reduce((acc, curr)=>acc+curr.sales,0)
  line_data[i]=sales_sum
}
console.log(line_data)
myChart.destroy()
myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: Object.keys(line_data),
    datasets: [{
      label: 'Sales per Month',
      data: Object.values(line_data),
      borderColor: 'rgba(0, 123, 255, 1)',
      fill: false
    }]
  },
  options: {
    responsive: true
  }
});











}
/// ---------------------



d3.select('#user_regions').on('change', main)
main()
})})})})


//  CLIENT DATA----------------------
  // let clientData_sorted_2 = {}
  // clientData.forEach(d=>{
  //   clientData_sorted_2[d.client_id] = d
  // })
  // let clientData_filtered_2 = client_ids.map(d=>clientData_sorted_2[d])

  // const clientNames = {};
  // clientData_filtered_2.forEach(cliente => { // Changed variable name to 'prod'
  //   const { client_id, client } = cliente;
  //   clientNames[client_id] = client;
  // });

  // let groupedSales_2 = salesData_filtered.reduce((acc, curr) => {
  //   const { month, sales } = curr;
  //   if (acc[month]) {
  //     acc[month] += sales;
  //   } else {
  //     acc[month] = sales;
  //   }
  //   return acc;
  // }, {});

//   let labels_2 = Object.keys(month);
//   let values_2 = Object.values(groupedSales_2);
//  const data_2 = [
//     {values: values_2,
//     labels: labels_2,
//     type: 'line'}
//  ]
//  const layout_2 = {
//   title: 'Sales by Month',
// };

// new Chartkick.LineChart("line-chart", clientSalesData, {
//   title: "Sales per Client"})



