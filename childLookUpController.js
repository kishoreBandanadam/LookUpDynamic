({
	onOptionClick : function(component, event, helper) {
		console.log("In child init");
        var selVal  = component.get("v.myContact");
        console.log(selVal);
        
        var evt = component.getEvent("LookupEventToParent");
        evt.setParams({
            selectedItem : selVal
        });
        evt.fire()
	}
})
