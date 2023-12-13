// Funzione per creare il markup HTML per una card di professore
function createProfessorCard(professore) {
    return `
    <div class="col-xl-3 col-sm-6">
    <div class="card">
        <div class="card-body">
    
            <div class="d-flex align-items-center">
                <div><img src="${professore.Fotoprofilo}" alt="" class="avatar-md rounded-circle img-thumbnail" /></div>
                <div class="flex-1 ms-3">
                    <h5 class="font-size-16 mb-1"><a href="#" class="text-dark">Diana Owens</a></h5>
                    <span class="badge badge-soft-danger mb-0">UI/UX Designer</span>
                </div>
            </div>
            <div class="mt-3 pt-1">
                <p class="text-muted mb-0"><i class="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i> 087 6321 3235</p>
                <p class="text-muted mb-0 mt-2"><i class="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i> DianaOwens@spy.com</p>
                <p class="text-muted mb-0 mt-2"><i class="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i> 52 Ilchester MYBSTER 9WX</p>
            </div>
            <div class="d-flex gap-2 pt-4">
                <button type="button" class="btn btn-soft-primary btn-sm w-50"><i class="bx bx-user me-1"></i> Profile</button>

            </div>
        </div>
    </div>
</div>
    `;
  }
  
    