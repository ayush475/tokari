class APIFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;

    }
    search(){
        const keyword=this.queryStr.keyword ?{
            name:{
                $regex:this.queryStr.keyword,
                $options:'i'
            }

        }:{}
        //for testing purpose
        console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    }
    filter() {

        const queryCopy = { ...this.queryStr };

        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);
        //to print the querycopy 
        // for frontend
        console.log(queryCopy);
        //for other variable filters()
        let queryStr=JSON.stringify(queryCopy);
       //fuck mongodb
       //we need to  replace gte , lte with $ sign to work 
       //backtick is right below esc key  and i realize how dumb i am
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        
        this.query=this.query.find(JSON.parse(queryStr));
        return this;
    }
    //../products?page=number in api
    //i will  update the api list
    pagination(resPerPage){
        const CurrentPage =Number(this.queryStr.page)|| 1;
        const skip =resPerPage*(CurrentPage-1);
        this.query =this.query.limit(resPerPage).skip(skip);
        return this;

    }

   
}
module.exports=APIFeatures
