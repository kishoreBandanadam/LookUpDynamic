({
    doInit : function(component, event, helper) {
        /*var s = [{name : "kishore"},
                 {name : "bala"}];
        
        component.set("v.selected", s);*/
    },
    
    onchange : function(component, event, helper) {
        helper.onchange(component, event, helper);
    },
    
    onblur : function(component, event, helper) {
        helper.onblur(component, event, helper);
    },
    
    onfocus : function(component, event, helper) {
        helper.onfocus(component, event, helper);
    },
    
    handleRemoveOnly : function(component, event, helper) {
        helper.handleRemoveOnly(component, event, helper);
    },
    
    onOptionClick : function(component, event, helper) {
        helper.onOptionClick(component, event, helper);
    },
    
    handleEvent : function(component, event, helper) {
        helper.handleEvent(component, event, helper);
    },
})
