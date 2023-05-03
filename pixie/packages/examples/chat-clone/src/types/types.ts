
// The table stores topics.

// Fields:
//  * `Id` name of the topic, primary key
//  * `CreatedAt` topic creation time
//  * `UpdatedAt` timestamp of the last change to topic metadata
//  * `State` topic state: normal (ok), suspended, soft-deleted
//  * `StateAt` timestamp when the state was last updated or NULL
//  * `Access` stores topic's default access permissions
//   * `Auth`, `Anon` permissions for authenticated and anonymous users respectively
//  * `Owner` ID of the user who owns the topic
//  * `Public` application-defined data
//  * `State` state of the topic: normal, disabled, deleted
//  * `SeqId` sequential ID of the last message
//  * `DelId` topic-sequential ID of the deletion operation
//  * `UseBt` indicator that channel functionality is enabled in the topic

// Indexes:
// * `Id` primary key
// * `Owner` index
interface Topic {
    "@type": string
    Id: string // name of the topic, primary key
    CreatedAt: string // topic creation time
    UpdatedAt: string // timestamp of the last change to topic metadata
    State: string // topic state: normal (ok), suspended, soft-deleted // state of the topic: normal, disabled, deleted
    StateAt: string | null // timestamp when the state was last updated or NULL
    Access: string // stores topic's default access permissions => `Auth`, `Anon` permissions for authenticated and anonymous users respectively
    Owner: string // ID of the user who owns the topic
    Public: string //  application-defined data
    SeqId: string // sequential ID of the last message
    DelId: string // topic-sequential ID of the deletion operation
    UseBt: string // indicator that channel functionality is enabled in the topic
}

// ### Table `subscriptions`
// The table stores relationships between users and topics.

// Fields:
//  * `Id` used for object retrieval
//  * `CreatedAt` timestamp when the subscription was created
//  * `UpdatedAt` timestamp when the subscription was updated
//  * `DeletedAt` timestamp when the subscription was deleted
//  * `ReadSeqId` id of the message last read by the user
//  * `RecvSeqId` id of the message last received by any user device
//  * `DelId` topic-sequential ID of the soft-deletion operation
//  * `Topic` name of the topic subscribed to
//  * `User` subscriber's user ID
//  * `ModeWant` access mode that user wants when accessing the topic
//  * `ModeGiven` access mode granted to user by the topic
//  * `Private` application-defined data, accessible by the user only

// Indexes:
//  * `Id` primary key composed as "_topic name_':'_user ID_"
//  * `User` index
//  * `Topic` index
interface Subscription {

}

// ### Table `messages`
// The table stores `{data}` messages

// Fields:
// * `Id` currently unused, primary key
// * `CreatedAt` timestamp when the message was created
// * `UpdatedAt` initially equal to CreatedAt, for deleted messages equal to DeletedAt
// * `DeletedFor` array of user IDs which soft-deleted the message
//  * `DelId` topic-sequential ID of the soft-deletion operation
//  * `User` ID of the user who soft-deleted the message
// * `From` ID of the user who generated this message
// * `Topic` which received this message
// * `SeqId` messages ID - sequential number of the message in the topic
// * `Head` message headers
// * `Attachments` denormalized IDs of files attached to the message
// * `Content` application-defined message payload

// Indexes:
//  * `Id` primary key
//  * `Topic_SeqId` compound index `["Topic", "SeqId"]`
//  * `Topic_DelId` compound index `["Topic", "DelId"]`
//  * `Topic_DeletedFor` compound multi-index `["Topic", "DeletedFor"("User"), "DeletedFor"("DelId")]`
interface Message {

}

// ### Table `credentials`
// The tables stores user credentials used for validation.

// * `Id` credential, primary key
// * `CreatedAt` timestamp when the record was created
// * `UpdatedAt` timestamp when the last validation attempt was performed (successful or not).
// * `Method` validation method
// * `Done` indicator if the credential is validated
// * `Resp` expected validation response
// * `Retries` number of failed attempts at validation
// * `User` id of the user who owns this credential
// * `Value` value of the credential
// * `Closed` unvalidated credential is no longer being validated. Only one credential is not Closed for each user/method.

// Indexes:
// * `Id` Primary key composed either as `User`:`Method`:`Value` for unconfirmed credentials or as `Method`:`Value` for confirmed.
// * `User` Index