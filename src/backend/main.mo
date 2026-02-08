import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the access control state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type ContactSubmission = {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    submittedAt : Time.Time;
  };

  type ContactId = Nat;

  let submissions = Map.empty<ContactId, ContactSubmission>();

  var nextId : ContactId = 0;

  public type SubmissionInput = {
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
  };

  // User profile type as required by instructions
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Save a new contact/quote form submission (public, no auth required)
  public shared func submitContactForm(input : SubmissionInput) : async () {
    let submission : ContactSubmission = {
      input with
      submittedAt = Time.now();
    };
    submissions.add(nextId, submission);
    nextId += 1;
  };

  // Admin-only: Returns all stored contact/quote submissions in reverse-chronological order
  public shared query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view submissions");
    };

    let array = submissions.toArray().map(
      func((_, submission)) { submission }
    );
    array.reverse();
  };

  // Password-protected: Fetch all submissions using shared password
  // This is a read-only operation, so it should be a query function
  public shared query ({ caller }) func getAllSubmissionsWithPassword(password : Text) : async [ContactSubmission] {
    if (password != "harsh600606") {
      Runtime.trap("Unauthorized: Invalid password");
    };

    let array = submissions.toArray().map(
      func((_, submission)) { submission }
    );
    array.reverse();
  };

  // User profile management functions (required by instructions)

  public shared query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public shared query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
