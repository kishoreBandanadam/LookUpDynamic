({
    onchange : function(component, event, helper) {
        
        // Setting method name dynamically
        var methodName = component.get("v.methodName");
        console.log(methodName);
        
        var action = component.get(methodName);
        var term = component.get("v.sTerm");
        action.setParams({
            "searchTerm" :  term
        });
        
        if(term.length > 0){
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log(state);
            if(state === "SUCCESS")  {
                var result = response.getReturnValue();
                console.log(JSON.stringify(result));
                console.log(result);
                component.set("v.conList", result);
                if(term != "" && result.length > 0){
                    var ToOpen = component.find("toOpen");
                    $A.util.addClass(ToOpen, "slds-is-open");
                }else{
                    var ToOpen = component.find("toOpen");
                    $A.util.removeClass(ToOpen, "slds-is-open");
                }
            }
            
        });
        
        $A.enqueueAction(action);
        }
    },
    
    onblur : function(component, event, helper) {
        
        
        //Setting timeout so that we can capture the value onclick
        const blurTimeout = window.setTimeout(
            $A.getCallback(() => {
                var ToOpen = component.find("toOpen");
                $A.util.removeClass(ToOpen, "slds-is-open");
            }),
            300
        );
        component.set('v.blurTimeout', blurTimeout);
    },
    
    onfocus : function(component, event, helper) {
        var term = component.get("v.sTerm");
        var returnedResults = component.get("v.conList");
        console.log("in onfocus");
        console.log(term);
        if(term && returnedResults.length > 0){
            var ToOpen = component.find("toOpen");
            $A.util.addClass(ToOpen, "slds-is-open");
        }
        
    },
    
    handleRemoveOnly : function(component, event, helper) {
   
        var singleSel = component.get("v.singleSelect");
        if(singleSel){
            console.log("in remove");
            var sel = event.getSource().get("v.name");
            console.log(JSON.stringify(sel));
            var lis = component.get("v.selected");
            console.log(JSON.stringify(lis));
            for(var i = 0; i < lis.length; i++){
                console.log(JSON.stringify(lis[i]));
                console.log(lis[i].Id == sel.Id);
                if(lis[i].Id == sel.Id){
                    
                    lis.splice(i,1);
                }
            }
            
            component.set("v.selected", lis);
            console.log(JSON.stringify(lis));

            var Input = component.find("input");
            $A.util.removeClass(Input, "slds-hide");
            
            var lookupPill = component.find("lookup-pill");
            $A.util.addClass(lookupPill, "slds-hide");
            
        }else{
            console.log("in remove");
            var sel = event.getSource().get("v.name");
            console.log(JSON.stringify(sel));
            var lis = component.get("v.selected");
            console.log(JSON.stringify(lis));
            for(var i = 0; i < lis.length; i++){
                console.log(JSON.stringify(lis[i]));
                console.log(lis[i].Id);
                console.log(sel.Id);
                console.log(lis[i].Id == sel.Id);
                if(lis[i].Id == sel.Id){
                    
                    lis.splice(i,1);
                }
            }
            
            component.set("v.selected", lis);
            console.log(JSON.stringify(lis));
            
        }
    },
    
    handleEvent : function(component, event, helper) {
        
        var lookupEventToParent = event.getParam("selectedItem");
        console.log("In event handler");
        console.log(JSON.stringify(lookupEventToParent));
        var singleSel = component.get("v.singleSelect");
        
        if(!singleSel){
            var selectedList = [];
            var existing = component.get("v.selected");
            if(existing.length > 0){
                for(var i = 0; i < existing.length; i++){
                    selectedList.push(existing[i]);
                }
            }
            selectedList.push(lookupEventToParent);
            console.log(JSON.stringify(selectedList));
            component.set("v.selected", selectedList);
         
            const blurTimeout = component.get('v.blurTimeout');
            if (blurTimeout) {
                clearTimeout(blurTimeout);
            }
            var ToOpen = component.find("toOpen");
            $A.util.removeClass(ToOpen, "slds-is-open");
            
            //Empty Search string
            component.set("v.sTerm", "");
        }else{
            var selectedList = [];
            //var existing = component.get("v.selected");
            selectedList.push(lookupEventToParent);
            console.log(JSON.stringify(selectedList));
            component.set("v.selected", selectedList);

            var Input = component.find("input");
            $A.util.addClass(Input, "slds-hide");
            
            var lookupPill = component.find("lookup-pill");
            $A.util.removeClass(lookupPill, "slds-hide");
            
            const blurTimeout = component.get('v.blurTimeout');
            if (blurTimeout) {
                clearTimeout(blurTimeout);
            }
            var ToOpen = component.find("toOpen");
            $A.util.removeClass(ToOpen, "slds-is-open");
            //Empty Search string
            component.set("v.sTerm", "");
        }
    }
})
