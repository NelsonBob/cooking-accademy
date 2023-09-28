import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardBody,
    CardTitle,
    CardImg,
    Button,
    Modal,
  } from "reactstrap";
  import Swal from "sweetalert2";
import { getAuthUser } from "../../service/frontendService";
const CourItem = (props) => {
  const [videoModal, setVideoModal] = useState(false);
  const [idcour, setIdcour] = useState({});
  const navigate = useNavigate();
    const handleFollowLesson = (id) => {
        if(getAuthUser().subscription.canFollow){
          setIdcour(id)
          setVideoModal(true)
        }else{
        
          Swal.fire({
            icon: "error",
            title: 'Oops...',
            text: 'Vous avez atteint le nombre cours quotidien, pour suivre ce cours, passer à l\'offre supérieur.',
            confirmButtonText: 'Mettre à niveau',
            showCancelButton: true,
            cancelButtonText : 'Annulé',
            cancelButtonColor: '#d33',

            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/in/abonnement'
            }
          });
        }
      }
      const handleClose = () => setVideoModal(!videoModal);
      const handleVisualiser = () => {
        localStorage.setItem("idcour", idcour);
        handleClose();
        return navigate("/in/lesson");
      };
    return(
        <>
         <Card>
                  <CardImg
                    alt={props.lesson.name}
                    src={props.lesson.imgPath}
                    style={{ objectFit : 'cover', height : '200px' }}
                    top
                  />
                  <CardBody>
                    <CardTitle>{props.lesson.name}</CardTitle>
                    <Button color="primary" onClick={() => handleFollowLesson(props.lesson.id)}>Suivre ce cours</Button>
                  </CardBody>
                </Card>

                <Modal
                className="modal-dialog-centered"
                isOpen={videoModal}
                toggle={handleClose}
              >
                <div className="modal-header">
                  <h5 className="modal-title">{props.lesson.name} </h5>
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={handleClose}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body">
                <Button
                      color="primary"
                      className="btn-block"
                      onClick={() => handleVisualiser()}
                    >
                      Regarder la video
                    </Button>
                  <h3 className="mt-4 mb-2">Descritpion</h3>
                  <p>{props.lesson.description}</p>
                  <h3 className="mt-4 mb-2">Contenu</h3>
                  <p>{props.lesson.contentCour}</p>
                </div>
                <div className="modal-footer">
                  <Button
                    color="secondary"
                    data-dismiss="modal"
                    type="button"
                    onClick={handleClose}
                  >
                    Fermer
                  </Button>
                </div>
              </Modal>
        </>
    )
}

export default CourItem;