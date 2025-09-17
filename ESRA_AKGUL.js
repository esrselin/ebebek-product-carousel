
 if(window.location.pathname !== "/")
    console.log("wrong page")
else
{

function getData(url)
{
    fetch(url)
    .then((respose) => respose.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
}

getData('https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json')

}
