from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import db, Server, JoinServerUser
from app.forms import NewServerForm

server_routes = Blueprint("servers", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Add new server
@server_routes.route("/new", methods=["POST"])
@login_required
def new_server():
    """
    Create new server
    """
    form = NewServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = current_user.id
        name = form.data["name"]

        new_server = Server(user_id=user_id, name=name)
        db.session.add(new_server)
        db.session.commit()
        new_join = JoinServerUser(user_id=user_id, server_id=new_server.id)
        db.session.add(new_join)
        db.session.commit()
        return {
            "server": new_server.to_dict(),
            "joinServer": new_join.to_dict(),
        }

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
