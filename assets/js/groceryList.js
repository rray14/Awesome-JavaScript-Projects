
const itemsController = (function(){

    var items = function(id,item,quantity){
        this.id = id;
        this.item = item;
        this.quantity = quantity;
    }

    var data = {
        items_arr:[]
    }

    return{
        addItem: function(item,quant){
            var newItem, ID;

            if(data.items_arr.length > 0){
                ID = data.items_arr[data.items_arr.length - 1].id + 1;
            }else{
                ID=0;
            }
            newItem = new items(ID,item,quant);
            data.items_arr.push(newItem);
            console.log(data.items_arr);
            return newItem;

        },

        deleteItem: function(id){
            var ids, index;
            ids = data.items_arr.map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.items_arr.splice(index, 1);
            }

        },
        
        delAll : function(){
            data.items_arr.splice(0, data.items_arr.length)
            
        },
        givearray: function(){
            return {
                arr : data.items_arr
            };
        }
    };
})();

const UIController = (function(){

    return{
        getInput: function(){
            return{
                item : document.querySelector('.add_input').value,
                quantity : document.querySelector('.add_no').value
            };
        },

        addListInput : function(obj){
            var html;
            html = '<div class="grocery-item clearfix" id="item-%id%"><div class="item_list">%item%</div><div class="right clearfix"><div class="itemquant_list">%quantity%</div><div class="item_delete"><button class="item_delete--button"><i class="far fa-times-circle"></i></button></div></div></div>'
           
            newHtml = html.replace('%id%',obj.id);
            newHtml=newHtml.replace('%item%',obj.item);
            newHtml=newHtml.replace('%quantity%',obj.quantity);

            document.querySelector('.grocery-list').insertAdjacentHTML('beforeend',newHtml);

        },

        clear: function(){
            var fields;
            
            fields = document.querySelectorAll('.add_input'+','+'.add_no');
            
            fieldArr = Array.prototype.slice.call(fields);
            fieldArr.forEach(function(current,index,array){
                current.value="";
            });
            fieldArr[0].focus();
        },

        deleteListItem : function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        delAll : function(arr){

            var i,n;
            i=0,n=arr.length;
            console.log(n);
            for(i=0;i<n;i++){
                selectorID = arr[i].id;
                var ID ='item-'+selectorID;
                var el = document.getElementById(ID);
                el.parentNode.removeChild(el);
            }   
        }
    };

})();

const appController = (function(itemCtrl,uiCtrl){

    var setsEventListener = function(){
        document.querySelector('.add_button').addEventListener('click',ctrlAddInput);
        
        document.addEventListener('keypress',function(event){
            if(event.keyCode === 13){
                ctrlAddInput();
            }
        });
        document.querySelector('.container').addEventListener('click',ctrlDelInput);   
        document.querySelector('.display-clear').addEventListener('click',deleteAll); 
    };

    var ctrlAddInput = function(){
        var inp,newItem;
        inp = uiCtrl.getInput();

        if(inp.item==""){
            alert("Please enter an item");
            uiCtrl.clear();
        }else{
            newItem = itemCtrl.addItem(inp.item,inp.quantity);
            uiCtrl.addListInput(newItem);
            uiCtrl.clear();
            
        }

    };

    var ctrlDelInput = function(event){

        var itemID,splitID,type,ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            splitID = itemID.split('-');
            ID = parseInt(splitID[1]);
            itemCtrl.deleteItem(ID);
            uiCtrl.deleteListItem(itemID);
        }
    };

    var deleteAll = function(){

        var arr1 = itemCtrl.givearray();
        uiCtrl.delAll(arr1.arr);

        itemCtrl.delAll();
    }

    return{
        init : function(){
            console.log('Application has started.');
            setsEventListener();
        } 
    };

})(itemsController,UIController);

appController.init();