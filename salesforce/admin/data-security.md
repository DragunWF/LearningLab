# Control Access to Records

## Record Level Security

This level of security affects which type of records a user can create, read, update, and delete (CRUD). Not every record of the same object type can be viewed or modified by a given user.

### Four ways of implementing record-level security are:

1. Organization-wide defaults - species the default level of access users have to records they do not own.
2. Role hierarchies - ensures managers have access to the same records as their subordinates.
3. Sharing rules - are automatic exceptions to organization-wide defaults for particular groups of users, to give them access to records they don't own or can't normally see
4. Manual sharing - lets record owners or users with sufficient permissions give read and edit access to users who do not have access to the record any other way.

### Types of sharing models for objects on users:

- Private - only the record owner and users above that role can view, edit, and report on those records.
- Public Read Only - All users can view and report on records, but only the owner, and users above that role can edit them.
- Public Read/Write - All users can view, edit, and report on all records.
- Controlled by Parent - A user can view, edit, or delete a record if they can perform that same action on the object it belongs to.

[use image of the pyramid]

---

# Create a Role Hierarchy

## Role Hierarchy and Record Access

Role hierarchies work together with organization-wide default sharing settings to determine the levels of access users have to different records. Users can access the data if all users directly above them in the hierarchy can access that same data.

For custom objects, access through hierarchies cna be disabled with the "Grant Access Using Hierarchies" checkbox disabled in the sharing settings. With that, only the record owner and users granted access through sharing features receive access to the object’s records.

[use image of a hierarchy]

---

# Define Sharing Rules

Your org-wide default sharing settings give you a (relatively restrictive) baseline level of access for each object. If you have org-wide sharing defaults of Public Read Only or Private, you can open access back up for some users with sharing rules.

Sharing rules work ideally when they're defined for a particular group of users that you can determine or predict in advance, rather than a set of users that frequently changes.

## Public Groups

Public groups are collections of individual users, other groups, roles, or terriotries that have a common function.

For example, users with the Recruiter profile and SW Dev Manager role can both review job applications.
