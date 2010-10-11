function initTable(table, ref) {

capt = document.createElement("caption");
table.appendChild(capt);
table.captiontag=capt;
table.jsref = ref;
thead = document.createElement("thead");
table.appendChild(thead);
table.theadtag=thead;
thead.appendChild(document.createElement("tr"));

tbody = document.createElement("tbody");
table.appendChild(tbody);
table.tbodytag=tbody;

tfoot = document.createElement("tfoot");
table.appendChild(tfoot);
table.tfoottag=tfoot;

table.paging=true;
table.footer=true;
table.pageitems=10;
table.currentpage=0;
table.currentsorting=null;
table.filter=null;
table.columnsdef=[];
table.items=[];
table.loading=true;
table.setCaption=function(newCaption){
capt = this.captiontag;
capt.appendChild(document.createTextNode(newCaption));
table.needsupdate=true;
table.groupingColumn=null;
}
table.addColumn=function(id, name, xml, visible, sortingfunction, domfactory) {
if (sortingfunction ==false) {
	sortingfunction = null;
} else {
	sortingfunction = defaultSort;
}
if (domfactory==null) {
	domfactory=defaultDom;
}
this.columnsdef.push([id, name, xml, visible, sortingfunction, domfactory]);
this.needsupdate=true;
}

table.setColumnVisibility=function(id, value) {
for (i=0;i<this.columnsdef.length;i++) {
	c=this.columnsdef[i];
	if (c[0]==id) {
		if(c[3]!=value) {
			c[3]=value;
			this.needsupdate=true;
		}
	}
}
}

table.setItems=function(colitems) {
this.items=colitems;
this.loading=false;
this.needsupdate=true;
}

table.update=function() {
if (!this.needsupdate) return;

//vars

nocols = 0;
//header
tr = this.theadtag.childNodes[0];
while(tr.hasChildNodes()){tr.removeChild(tr.childNodes[0]);}
for (i=0;i<this.columnsdef.length;i++) {
	c=this.columnsdef[i];
	if (c[3]) {
		th = document.createElement("th");
		if (c[4] != null) {
			th.setAttribute("onclick", "javascript:"+this.jsref+".sort('"+c[0]+"');return false;")
			th.setAttribute("class", "sortable")
		}
		th.appendChild(document.createTextNode(c[1]));
		tr.appendChild(th);
		nocols++;
	}
}
// filter
items = this.items;
if (this.filter != null) {
	items = this.filter(items);
}
noitems = items.length
//body
sitem = 0;
eitem = noitems;
nopage = 0;

if (this.paging) {
	nopage = Math.ceil(noitems/this.pageitems);
	if (this.currentpage>(nopage-1)) {
		this.currentpage = nopage-1;
	}
	if (this.currentpage<0) {
		this.currentpage = 0;
	}
	sitem = this.pageitems*this.currentpage;
	eitem = sitem+this.pageitems;
	if (sitem>noitems) sitem = noitems;
	if (eitem>noitems) eitem = noitems;
}

gcolumn = this.groupingColumn;
var gcolumndef;
var groupingvalues = [];
if (gcolumn != null) {
	for (i=0;i<this.columnsdef.length;i++) {
		c=this.columnsdef[i];
		if(c[0] == gcolumn){
			gcolumndef = c;
			break;
		}
	}
	for(j=0; j<items.length;j++){
		item = items[j];
		groupingvalue = eval("item." + gcolumndef[2]);
		gfound = false;
		for (k=0; k<groupingvalues.length;k++){
			if (groupingvalue == groupingvalues[k][0]){
				index = groupingvalues[k][1].length ;
				groupingvalues[k][1][index] = item;
				gfound = true;
				break;
			}
		}
		if (!gfound){
			groupingvalues[groupingvalues.length]= [groupingvalue, [item]];
		}
	}
	groupingvalues.sort();
	
	tbody = this.tbodytag;
	if (this.currentsorting != null) {
		for (i=0;i<this.columnsdef.length;i++) {
			c=this.columnsdef[i];
			if (c[0]==this.currentsorting) {
				for (k=0; k< groupingvalues.length;k++) {
					groupingvalue = groupingvalues[k];
					groupingvalue[1] = c[4](groupingvalue[1], c);
				}
				break;
			}
		}		
	}
	while(tbody.hasChildNodes()){tbody.removeChild(tbody.childNodes[0]);}
/*	for (i=sitem;i<eitem;i++) {
		item=sorted[i];
		tr = document.createElement("tr");
		for (j=0;j<this.columnsdef.length;j++) {
			c=this.columnsdef[j];
			if (c[3]) {
				td = document.createElement("td");
				td.appendChild(c[5](item, c, td));
				tr.appendChild(td);
			}
		}
		tbody.appendChild(tr);
	}*/
	for (k=0; k< groupingvalues.length;k++) {
		groupingvalue = groupingvalues[k];
		tr = document.createElement("tr");
		tr.setAttribute("class", "grouping-row");
		td = document.createElement("td");
		td.setAttribute("colspan", this.columnsdef.length);
		td.appendChild(document.createTextNode(groupingvalue[0]));
		tr.appendChild(td);
		tbody.appendChild(tr);
		
		for (i = 0 ; i < groupingvalue[1].length;i++) {
			item = groupingvalue[1][i];
			tr = document.createElement("tr");
			for (j=0;j<this.columnsdef.length;j++) {
				c=this.columnsdef[j];
				if (c[3]) {
					td = document.createElement("td");
					td.appendChild(c[5](item, c, td));
					tr.appendChild(td);
				}
			}
			tbody.appendChild(tr);
		}
	}
} else {

	tbody = this.tbodytag;
	sorted = items;
	if (this.currentsorting != null) {
		for (i=0;i<this.columnsdef.length;i++) {
			c=this.columnsdef[i];
			if (c[0]==this.currentsorting) {
				sorted = c[4](sorted, c);
			}
		}
	}
	while(tbody.hasChildNodes()){tbody.removeChild(tbody.childNodes[0]);}
	for (i=sitem;i<eitem;i++) {
		item=sorted[i];
		tr = document.createElement("tr");
		for (j=0;j<this.columnsdef.length;j++) {
			c=this.columnsdef[j];
			if (c[3]) {
				td = document.createElement("td");
				td.appendChild(c[5](item, c, td));
				tr.appendChild(td);
			}
		}
		tbody.appendChild(tr);
	}
}

//footer
tfoot = this.tfoottag;
while(tfoot.hasChildNodes()){tfoot.removeChild(tfoot.childNodes[0]);}
if (this.footer) {
tr = document.createElement("tr");
td = document.createElement("td");
td.setAttribute("colspan", ""+nocols)
tr.appendChild(td);
tfoot.appendChild(tr);
text = ""+noitems+" item(s) found";
if (this.paging) {
	text = text +", displaying items "+(sitem+1)+" to "+(eitem)+" ";
}
if (this.loading) {
	text = "Please wait while retrieving content...";
}

td.appendChild(document.createTextNode(text));

if (this.paging) {
	if (nopage != 1) {
		sp = document.createElement("span");
		sp.setAttribute("class", "pages");
		for (i=0; i<nopage; i ++) {
			if (i== this.currentpage) {
				sp.appendChild(document.createTextNode(""+(i+1)+" "));
			} else {
	
				a = document.createElement("a");
				a.setAttribute("href", "#");
				a.setAttribute("onclick", "javascript:"+table.jsref+".setCurrentPage("+i+");return false;");
				a.appendChild(document.createTextNode(""+(i+1)));
				sp.appendChild(a);
				sp.appendChild(document.createTextNode(" "));
			}
		}
		td.appendChild(sp)

	}
}
}
this.needsupdate=false;
}
table.setCurrentPage=function(page) {
if (page != this.currentpage) {
	this.currentpage = page;
	table.needsupdate = true;
	table.update();
}	
} // end function

table.sort=function(id) {
	table.currentsorting = id;
	table.needsupdate = true;
	table.update();
} // end function

} // end file
var tmpc;
function defaultSort(items, column) {
	tmpc=column;
	return items.sort(mySort);
}
function mySort(a, b) {
	return get(a, tmpc)>get(b, tmpc);
}
function get(item, column) {
	return eval("item."+column[2]);
}
function defaultDom(item, column, td) {
	return document.createTextNode(eval("item."+column[2]));
}
