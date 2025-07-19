import React from 'react';
import './mood.css';
import privacy from '../../mood/privacypolicy.jpg'
import noti from '../../mood/noti.jpg'
import demonoti from '../../mood/demonoti.jpg'
import sel from '../../mood/sel.jpg'
import head from '../../mood/head.jpg'
import save from '../../mood/save.jpg'
import todaymood from '../../mood/today.jpg'
import cal from '../../mood/cal.jpg'
import add from '../../mood/add.jpg'
import swi from '../../mood/swi.jpg'


const Mood = () => {

    return (
        <div className="mood_container">
            <h3 className='title'>Mood Journal</h3>




            <div className='para'>
                <h4 className='subTitle'>A Journal of Your Feelings</h4>
                <p>Mood Journal is your personal space to track emotions and capture daily reflections with ease. Whether through timely notifications or at your own pace, you can log how you're feeling in just a few lines. At the end of the day, the app automatically compiles your entries into a thoughtful journal—just tap “Write Mood Journal”, or let the app do it for you. Even if you forget, don't worry—we've already saved your moods. Simply visit the calendar anytime to read your journal entries.

                    But there’s more—Mood Journal lets you connect with friends. Just add their Journal ID and you can read their mood journals in real time. It’s simple, personal, and beautifully human.

                </p>
            </div>

            <div className='img_txt_container'>
                <small>Click Android button to download the apk</small>

                <div className='img_left_right'>
                    <a
                        href="https://github.com/lahonsourav/flask-mood-diary/releases/download/v1.0.0-beta/application-1b6be896-ad4b-449c-a9a9-979c627b5986.apk"
                        download="mood-summary-beta.apk"
                    >
                        <div className='download-button'>Android (Beta Test)</div>
                    </a>
                    <div className='download-button'>iOS (Coming Soon)</div>
                </div>



            </div>
            <h4 className='subTitle'>Please take a moment to read our Privacy Policy</h4>

            <div className='img_txt_container'>
                <div className='img_left_right'>

                    <img src={privacy} alt="privacy_poicy_image" className='image' />
                    <p className='para_img'>Your privacy is important to us. This app is designed to help you track, reflect, and gain insights into your emotional well-being through regular mood logging. To deliver a personalized and seamless experience, we collect certain types of data while ensuring your privacy is protected at every step. Specifically, the app collects a unique device ID to distinguish your data and associates mood entries, timestamps, and summaries with it. These are securely stored in a cloud-based database that enables features like backup, synchronization, and restoration across devices.

                        Your data is never sold or used for advertising purposes. We use it solely to enhance your experience within the app—for instance, to generate AI-driven summaries based on your mood entries, and to provide tailored reminders. You have full control over your data sharing preferences. Only the users you explicitly add as friends can access your shared diary entries. No one else, including third parties, has access to your private content. We implement strict access controls and encryption protocols to protect your information from unauthorized access or misuse.

                        The app also requires notification permissions to function effectively. These are used to remind you at regular intervals to log your mood, notify you when your AI-generated diary summary is ready, and inform you of relevant app updates. You can manage these settings at any time through your device’s system preferences. All notifications are handled respectfully, with no disruptive or intrusive messaging.

                        By using this app, you agree to the collection and use of information in accordance with this policy. If at any time you wish to delete your data or deactivate your account, you may do so from the app’s settings or by contacting support. We are committed to transparency and security, and we regularly update our privacy practices to comply with evolving data protection regulations and user expectations.

                    </p>
                </div>
            </div>
            <div className='img_txt_container'>
                <div className='img_left_right'>
                    <p className='para_img'>To help you build a consistent mood tracking habit, our app uses notifications to gently remind you to log your mood at regular intervals throughout the day. These reminders ensure that your entries are timely and reflective of how you're truly feeling in the moment. Notifications also let you know when your daily AI-generated mood summary is ready and when there are important updates related to your diary. Granting notification permission ensures you get the full experience and never miss a chance to reflect, track, and grow.

                    </p>
                    <img src={noti} alt="notification_peermission_image" className='image' />
                </div>
            </div>
            <h4 className='subTitle'>Let's log your mood</h4>

            <div className='img_txt_container'>
                <div className='img_left_right'>

                    <img src={demonoti} alt="demo_notification_image" className='image' />
                    <p className='para_img'> After allowing notification permissions, you'll start receiving gentle reminders to log your mood throughout the day. Tapping on a notification will take you directly to the mood entry tab for a quick and easy update. You can also open the app anytime to log your mood manually—notifications simply help you stay consistent.

                    </p>
                </div>
            </div>
            <div className='img_txt_container'>
                <div className='img_left_right'>
                    <img src={sel} alt="mood_select_image" className='image' />
                    <img src={head} alt="mood_select_image" className='image' />
                    <img src={save} alt="mood_select_image" className='image' />
                </div>
            </div>

            <h4 className='subTitle'>Today's Journal and Mood emoji Calendar</h4>

            <div className='img_txt_container'>
                <div className='img_left_right'>

                    <img src={todaymood} alt="today_mood_image" className='image' />
                    <p className='para_img'>Your mood entries for the day are saved on the Today’s Journal page, where you can view, update, or delete them anytime—ensuring you never miss a moment of reflection. The "Write Mood Journal" button becomes active after 11:00 PM, allowing you to generate your personalized journal summary anytime between 11 PM and midnight.

                        Even if you forget to generate your journal, don’t worry—we’ve got you covered. All your mood entries are automatically saved to the calendar. You can tap on any past date to view your moods and journal summaries, helping you stay connected with your emotional journey over time.

                        <br />
                        <br />

                        Even if you forget to generate your journal, don’t worry—we’ve got you covered. All your mood entries are automatically saved to the calendar. You can tap on any past date to view your moods and journal summaries, helping you stay connected with your emotional journey over time.


                        <br />
                        <br />
                        Based on the variety of moods you log throughout the day, the app intelligently analyzes your overall emotional trend and assigns a representative emoji for the day. This emoji will appear on the calendar, giving you a quick visual overview of your emotional patterns. Simply click on any emoji-marked date to explore your detailed mood entries and journal for that day.


                    </p>
                    <img src={cal} alt="calendar_image" className='image' />
                </div>
            </div>
            <h4 className='subTitle'>There's more! Add your Friend</h4>

            <div className='img_txt_container'>
                <div className='img_left_right'>


                    <p className='para_img'>
                        Every user is provided with a unique Journal ID, which appears at the top left corner of the Calendar tab. This ID serves as a secure and consistent identifier for your mood diary across devices. You can simply tap the ID to copy it, making it easy to share with friends if you'd like them to view your emotional journey. Sharing your Journal ID allows for meaningful emotional connection, especially when you're supporting each other through different moods and days.

                        Likewise, you can ask your friend for their Journal ID and add it to your calendar view. Once added, you’ll be able to access their shared mood entries and journal summaries directly within your app. Their moods will appear on a separate calendar, allowing you to understand how they've been feeling over time. This feature is designed to help foster empathy and emotional support between trusted users, while still maintaining privacy and control—only those with the shared ID can view the data. You can remove a friend's access at any time if you no longer wish to keep their journal linked.
                    </p>

                    <img src={add} alt="today_mood_image" className='image' />
                    <img src={swi} alt="today_mood_image" className='image' />
                </div>
            </div>

            <h4 className='subTitle'>'Mood Diary' Beta Now Available for Android!</h4>


            <div className='img_txt_container'>
                <small>Click Android button to download the apk</small>

                <div className='img_left_right'>
                    <a
                        href="https://github.com/lahonsourav/flask-mood-diary/releases/download/v1.0.0-beta/application-1b6be896-ad4b-449c-a9a9-979c627b5986.apk"
                        download="mood-summary-beta.apk"
                    >
                        <div className='download-button'>Android (Beta Test)</div>
                    </a>
                    <div className='download-button'>iOS (Coming Soon)</div>
                </div>



            </div>

            <div className='img_txt_container'>
                <small className='footer'>Copyright © 2025 lahon.in/mood</small>

            </div>


        </div>
    );
};

export default Mood;