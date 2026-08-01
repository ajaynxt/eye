const body=document.body;
const header=document.getElementById("header");
const menu=document.getElementById("menu");
const nav=document.getElementById("nav");
window.addEventListener("scroll",()=>header.classList.toggle("scrolled",window.scrollY>20));
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");body.classList.toggle("locked",open);menu.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");body.classList.remove("locked");menu.setAttribute("aria-expanded","false");}));

const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals=document.querySelectorAll(".reveal");
if("IntersectionObserver"in window&&!reduced){const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");o.unobserve(e.target);}}),{threshold:.1});reveals.forEach(x=>o.observe(x));}else reveals.forEach(x=>x.classList.add("visible"));

function openDialog(d){d.showModal();body.classList.add("locked")}
function closeDialog(d){d.close();body.classList.remove("locked")}

const appointmentModal=document.getElementById("appointmentModal");
const appointmentClose=document.getElementById("appointmentClose");
const appointmentForm=document.getElementById("appointmentForm");
const serviceSelect=document.getElementById("serviceSelect");
const doctorSelect=document.getElementById("doctorSelect");
const dateInput=appointmentForm.elements.date;
const tomorrow=new Date();tomorrow.setDate(tomorrow.getDate()+1);dateInput.min=tomorrow.toISOString().split("T")[0];dateInput.value=dateInput.min;
document.querySelectorAll("[data-open-appointment]").forEach(b=>b.addEventListener("click",()=>openDialog(appointmentModal)));
document.querySelectorAll("[data-service]").forEach(b=>b.addEventListener("click",()=>{serviceSelect.value=b.dataset.service;openDialog(appointmentModal)}));
document.querySelectorAll("[data-doctor]").forEach(b=>b.addEventListener("click",()=>{doctorSelect.value=b.dataset.doctor;openDialog(appointmentModal)}));
appointmentClose.addEventListener("click",()=>closeDialog(appointmentModal));
appointmentModal.addEventListener("click",e=>{if(e.target===appointmentModal)closeDialog(appointmentModal)});
appointmentModal.addEventListener("close",()=>body.classList.remove("locked"));

const treatmentModal=document.getElementById("treatmentModal");
const treatmentClose=document.getElementById("treatmentClose");
const treatmentTitle=document.getElementById("treatmentTitle");
let activeTreatment="";
document.querySelectorAll("[data-treatment]").forEach(b=>b.addEventListener("click",()=>{activeTreatment=b.dataset.treatment;treatmentTitle.textContent=activeTreatment;openDialog(treatmentModal)}));
document.getElementById("chooseTreatment").addEventListener("click",()=>{const first=activeTreatment.split(" ")[0];const option=[...serviceSelect.options].find(o=>o.value.startsWith(first));if(option)serviceSelect.value=option.value;closeDialog(treatmentModal);openDialog(appointmentModal)});
treatmentClose.addEventListener("click",()=>closeDialog(treatmentModal));
treatmentModal.addEventListener("click",e=>{if(e.target===treatmentModal)closeDialog(treatmentModal)});
treatmentModal.addEventListener("close",()=>body.classList.remove("locked"));

const doctorModal=document.getElementById("doctorModal");
const doctorClose=document.getElementById("doctorClose");
document.querySelectorAll("[data-open-doctor]").forEach(b=>b.addEventListener("click",()=>openDialog(doctorModal)));
document.querySelectorAll("[data-doctor-choice]").forEach(b=>b.addEventListener("click",()=>{doctorSelect.value=b.dataset.doctorChoice;closeDialog(doctorModal);openDialog(appointmentModal)}));
doctorClose.addEventListener("click",()=>closeDialog(doctorModal));
doctorModal.addEventListener("click",e=>{if(e.target===doctorModal)closeDialog(doctorModal)});
doctorModal.addEventListener("close",()=>body.classList.remove("locked"));

const emergencyModal=document.getElementById("emergencyModal");
const emergencyClose=document.getElementById("emergencyClose");
document.querySelectorAll("[data-emergency]").forEach(b=>b.addEventListener("click",()=>openDialog(emergencyModal)));
emergencyClose.addEventListener("click",()=>closeDialog(emergencyModal));
emergencyModal.addEventListener("click",e=>{if(e.target===emergencyModal)closeDialog(emergencyModal)});
emergencyModal.addEventListener("close",()=>body.classList.remove("locked"));

const filters=[...document.querySelectorAll("[data-filter]")];
const cards=[...document.querySelectorAll("[data-category]")];
filters.forEach(b=>b.addEventListener("click",()=>{const f=b.dataset.filter;filters.forEach(x=>x.classList.toggle("active",x===b));cards.forEach(c=>c.hidden=f!=="All"&&c.dataset.category!==f)}));

const symptomForm=document.getElementById("symptomForm");
const symptomResult=document.getElementById("symptomResult");
const routes={
"Blurred or changing vision":["Comprehensive Eye Checkup","Arrange a qualified eye examination. Do not use this result as a diagnosis."],
"Eye pain or redness":["Prompt Eye Consultation","Eye pain or redness can have many causes. An in-person assessment is the appropriate next step."],
"Flashes, floaters or sudden visual change":["Urgent Retina Assessment","Sudden visual changes may need prompt evaluation. Contact a real local eye-care provider without waiting for a website response."],
"Child vision or eye alignment concern":["Paediatric Eye Consultation","Arrange an assessment with a qualified paediatric eye specialist."],
"Routine eye checkup":["Routine Eye Checkup","Choose a convenient consultation slot for a complete eye examination."]
};
symptomForm.addEventListener("submit",e=>{e.preventDefault();const s=new FormData(symptomForm).get("symptom");if(!s){symptomResult.querySelector("h3").textContent="Choose one concern";symptomResult.querySelector("p").textContent="Select an option before the demo can suggest an appointment category.";return}const[t,c]=routes[s];symptomResult.querySelector("small").textContent="SUGGESTED APPOINTMENT CATEGORY";symptomResult.querySelector("h3").textContent=t;symptomResult.querySelector("p").textContent=c;if(s.startsWith("Flashes"))setTimeout(()=>openDialog(emergencyModal),350)});

const centreSearch=document.getElementById("centreSearch");
const centres=[...document.querySelectorAll("[data-centre]")];
centreSearch.addEventListener("input",()=>{const q=centreSearch.value.trim().toLowerCase();centres.forEach(c=>c.hidden=Boolean(q)&&!c.dataset.centre.includes(q)&&!c.textContent.toLowerCase().includes(q))});
document.querySelectorAll("[data-centre-enquiry]").forEach(b=>b.addEventListener("click",()=>{const m=`Hello Ajay, I am viewing the Irisora Eye Institute demo. I want details about the ${b.dataset.centreEnquiry} section.`;open(`https://wa.me/919929562585?text=${encodeURIComponent(m)}`,"_blank","noopener")}));
document.querySelectorAll("[data-resource]").forEach(b=>b.addEventListener("click",()=>{const m=`Hello Ajay, I am viewing the Irisora eye-clinic demo. I want a patient-education section about: ${b.dataset.resource}.`;open(`https://wa.me/919929562585?text=${encodeURIComponent(m)}`,"_blank","noopener")}));

document.querySelectorAll(".faq-list article>button").forEach(b=>b.addEventListener("click",()=>{const was=b.getAttribute("aria-expanded")==="true";document.querySelectorAll(".faq-list article>button").forEach(x=>x.setAttribute("aria-expanded","false"));b.setAttribute("aria-expanded",String(!was))}));

function setError(input,msg){input.setAttribute("aria-invalid",String(Boolean(msg)));const e=input.closest("label")?.querySelector(".error");if(e)e.textContent=msg;return!msg}
function validate(input){if(input.type==="checkbox")return setError(input,input.required&&!input.checked?"Please confirm the demo notice.":"");if(input.required&&!input.value.trim())return setError(input,"This field is required.");if(input.name==="phone"&&input.value.trim()&&!/^[0-9+\s()-]{8,18}$/.test(input.value.trim()))return setError(input,"Enter a valid phone number.");return setError(input,"")}
function validateForm(form){const req=[...form.querySelectorAll("[required]")];const ok=req.map(validate).every(Boolean);if(!ok)req.find(x=>x.getAttribute("aria-invalid")==="true")?.focus();return ok}

appointmentForm.querySelectorAll("[required]").forEach(i=>{i.addEventListener("blur",()=>validate(i));if(i.type==="checkbox")i.addEventListener("change",()=>validate(i))});
appointmentForm.addEventListener("submit",e=>{e.preventDefault();if(!validateForm(appointmentForm))return;const d=new FormData(appointmentForm);const m=["Hello Ajay, I am viewing the Irisora Eye Institute demo.","","Demo appointment enquiry:",`Patient: ${d.get("name")}`,`Phone: ${d.get("phone")}`,`Service: ${d.get("service")}`,`Doctor: ${d.get("doctor")}`,`Centre: ${d.get("centre")}`,`Date: ${d.get("date")}`,`Slot: ${d.get("slot")}`,`Visit Type: ${d.get("visit")}`,`Notes: ${d.get("notes")||""}`,"","I also want details about an eye-clinic website."].join("\n");open(`https://wa.me/919929562585?text=${encodeURIComponent(m)}`,"_blank","noopener")});

const priceForm=document.getElementById("priceForm");
priceForm.querySelectorAll("[required]").forEach(i=>i.addEventListener("blur",()=>validate(i)));
priceForm.addEventListener("submit",e=>{e.preventDefault();if(!validateForm(priceForm))return;const d=new FormData(priceForm);const m=["Hello Ajay, I want an eye-care website price.","",`Name: ${d.get("name")}`,`Phone: ${d.get("phone")}`,`Clinic / Business: ${d.get("business")||""}`,`Website Type: ${d.get("type")}`,`Project Details: ${d.get("details")||""}`,"","Reference: Irisora Eye Institute Demo"].join("\n");open(`https://wa.me/919929562585?text=${encodeURIComponent(m)}`,"_blank","noopener")});

document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;[appointmentModal,treatmentModal,doctorModal,emergencyModal].forEach(d=>{if(d.open)closeDialog(d)})});
