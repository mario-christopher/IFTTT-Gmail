## My Business: *"DisneyWorld Toys For All"*
I sell DisneyWorld Toys to vendors across the country. I purchase these toys straight from the manufacturer and sell them to vendors wholesale.

## Business Model:
Vendors send me an email with the Order information. The Email contains the Toy Name, Quantity required and Date by which they require it. Vendors also send an email when they need to return surplus, replacement or defective toys. To streamline the emails, they set the Subject of the email to "New Order", "Returns Surplus", "Returns Defective", "Returns Replacement" etc.

## Problem Definition:
Over a period of time, I receive hundreds of emails from vendors for purchases or returns. I need to rank my vendors to know the ones consuming most of my toys and the ones returning them, and the frequency. Pouring over the hundreds of emails to rank my vendors is NOT an effective or productive process. I need a digital solution to help me rank my vendors.

## Solution:
Create a Serverless solution (or FaaS) to resolve my problem.

## Components involved:
* [GMail](www.gmail.com) - *I receive vendor emails in my gmail account. This is also a Service on IFTTT.*
* [mLab](https://mlab.com/) - *A cloud hosted MongoDB, that is a repository for storing email information from vendors, for analysis and ranking.*
* [Webtask](https://webtask.io/) - *The FaaS that extends my functionality and helps analyze my emails.*
* [IFTTT](https://ifttt.com/) - *An online service to monitor my gmail inbox and connect to Webhook.*
* [Webhook](https://ifttt.com/maker_webhooks) - *A service available on IFTTT.*


## Process and Setup:
* **GMail:** 
    * Set up a regular free gmail account. Establish clear protocol with vendors to set the Subject of the email corresponding to the email content and intent.

* **mLab:**
    * Set up an account with mLab.
    * Create a Database, set username and password.
    * Create a Collection - "gmails", to be the repository for incoming emails.
    * Note and copy the URL created for you by mLab.

* **Webtask:**
    * Set up an account with Webtask.
    * Use the online Webtask editor (I did), or download the cli and work locally.
    * Create a new webtask - "save_incoming_gmail.js"
    * Note and copy the URL created for you by Webtask.
    * Add a "secret" to the Webtask, and enter the URL to the online MongoDB provided by mLab.
    * Within the Webtask, extract the email information passed in the context:
        ```
        let newGmail = {
                from: context.data.from,
                name: context.data.name,
                received: context.data.received,
                subject: context.data.subject
        };
        ```
    * Get the MongoDB url from the secret and connect to the online DB
        ```
        context.secrets.MONGO_URL
        ```
    * Save the ```newGmail``` object to the "gmails" collection.

* **IFTTT:** 
    * Create a free account with IFTTT.
    * Connect GMail and Webhook, the services involved, in an Applet.
    * The recipe for the Applet would be:
        * "If any new email in inbox for <my_gmail_account>, then make a web request"
        * Use the URL provided by Webtask in this recipe. Also make sure to add the Query params to the URL for the data bits that are needed.
        ```
        https://wt-<blah-blah>.run.webtask.io/save_incoming_gmail?from={{FromAddress}}&name={{FromName}}&received={{ReceivedAt}}&subject={{Subject}}
        ```
        * Save the recipe.

    Thats it !

    Now, whenever I get a new email, the Webtask saves that email information into MongoDB. I can now run fancy queries against the "gmails" collection in MongoDB and analyse and rank my vendors.

##  Webtask Rocks !!! :-)