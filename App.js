import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
const LIGHT = {
  blue: '#28A8E0',
  actionBlue: '#0080FF',
  ink: '#161616',
  slate: '#4E5C73',
  muted: '#79859A',
  line: '#E7EBF0',
  paper: '#FFFFFF',
  soft: '#F2F2F4',
  sky: '#EAF7FD',
  gold: '#FFC404',
};
const DARK = { ...LIGHT, ink: '#FFFFFF', slate: '#B5BFCE', muted: '#98A4B5', line: '#30343A', paper: '#121212', soft: '#202124', sky: '#142B38' };
let C = LIGHT;

const symbols = { 'arrow-forward-circle-outline': '→', 'arrow-back': '←', checkmark: '✓', 'arrow-forward': '→', 'mail-outline': '✉', 'call-outline': '⌕', 'lock-closed-outline': '⌑', 'eye-outline': '◉', 'eye-off-outline': '◌', 'logo-google': 'G', 'logo-apple': '●', 'chatbubble-ellipses-outline': '☏', 'chevron-forward': '›', microphone: '♩', 'settings-outline': '☼', search: '⌕', 'graphic-eq': '≋', 'heart-outline': '♡', heart: '♥', shuffle: '⤨', 'play-skip-back': '⏮', play: '▶', pause: 'Ⅱ', 'play-skip-forward': '⏭', repeat: '↻', 'play-circle-outline': '◯', 'add-circle-outline': '⊕', 'headset-outline': '◉', 'home-outline': '⌂', 'library-outline': '☷', 'chevron-down': '⌄', 'ellipsis-horizontal': '•••', 'chevron-up': '⌃', 'moon-outline': '◐', 'sunny-outline': '☼', 'open-outline': '↗' };
function Icon({ name, size = 20, color = C.ink }) { return <Text style={{ color, fontSize: size, lineHeight: size + 3, fontWeight: '800', textAlign: 'center' }}>{symbols[name] || '•'}</Text>; }
const Ionicons = Icon;
const Feather = Icon;
const MaterialCommunityIcons = Icon;

const source = {
  welcome:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBO0w5QRBleFpE8i0l9UPWGWBS13zwFaTrEd7eBpytnbv4IGjBt5G7__ljkRyqJhR5BNVI1MypQ5E43Ih67_-tQ21kxL2uLIjFEsZnnup6xihBsjpo21-zlKnchi4wMyZTA0Yj7AMILZg50wa_ihl2B6IHcHzWjJI2xrRGUSr85d576IW_9WcE6-MeV91abekMC7bsukTNG5w0AgOccyNXNqbQwte63acNb3WiIyhu162FrwMSpYfx707BT8hzBIdq2gQ',
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCNNvFK1OYdQXqzb6LELDTX_bbC3AGjq100-XDjeQIeZDk99JBGAWVzGaltBWOrvif5bqB78-zYCNpFXUEL0L1YYwgq_JfFMOGYDTPPUP1Rxa5ucAjnBCPypQCzIyOfg5IOEYmSDUkJqXVnkDw0n_-Dveq4Tqw56POvGpVs3wMVch0AABA0XiYkV6ri2YmijR8Wb4QOeXJ5nrDUBuOIO3MYQMkN8_tiOn2NHK7PwCSg3pmCZi4NPKIc',
  homeDaily: require('./assets/home-daily.png'),
  homePodcasts: require('./assets/home-podcasts.png'),
  homeShows: require('./assets/home-shows.png'),
  homeFavourite: require('./assets/stitch/card-01.png'),
  daily: require('./assets/home-daily.png'),
  podcasts: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB0jfFmpsObtFabtc34bj8GJISY0B2ca0ZGH1sRvoqAodr2qMx-R_N7_m1duFn_QeYzSlPHTyk66VKHvk66Z6RghuGBdOQZ8lgp3268eeOqKYXDJ5crtRxODV0QREOFAOfXjXJm7-r8XjfLgZKwMUL3rxAFfn6qFwR2OIDXQ_ErF80Lqm7Ny2ndsL7DatKzjqF_Acjt70FrLvSTZmks_He_oC1cWBTjJo_e2U2L4DkznleDx_1f9zli',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA4bnKYj5UpzhJ9qlNEhM-rxo-EkFw8N519fzsIE8M9Qmu3hQ5tosCuMQnfoYQqIk_fDvdAs9xs0yhy-lLrNADsr1HLfpesP8bQg5XNaE-bBLetVGpp1jxrrHOgW60UBOl-4vmxUSMnsVDvwtGrKxlu0K0r2hSbNZcUBbEk5sWIHY8T8Iga3Rios_GTqmg_t0Qu4UUmDakXQ2ddPYberMKS_uHid6Ti_SytWol8t40AT0hw8lJQm8Ec',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCUgsziwQ9-XQ3M7XfDT4utT1DDmNc-NEaJXdDHMDmL6ppwR8FjZwSAlySKM_jUN21XNQNu3dLSw5B6oCVGU2UsD5NfGfM9P_1HSmMnXrUVwmxjFHWyfTKeLvPOgJqb4paHXnXv3zC4UAXANA-z_H12PpskkNNGvkw1Rg3OrKYg0yAS3RSw2SEUoyB_Vpb2lsB1AIdYIllSpqT3Qg_pyWtpwWm_ZWzBD7fqligf-z1tkQ2RNg_q_I0O',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAIoCYvHVQfNLEXXO9rzHbh052Vhw0pMgmJ91mSr8ok-ZeQTsveHedRCFtcTBoP2Mxb5Oy7cw4naYHtjnxNGkNkVLHC9svvo6pYkZWu7A3Mw6g8dnsjQ9BUKc_ZLYE1iZCyzDVVXK3jQnpvMfkcgX2Lij5mjOk7yuTdCNCUQp7VtlM_hnna9x4wxqTHoWUCbXwyg98-oBkC7osoQI-nF5vlwDeVwZk4cuc9JQm8kVVvh3RgHuaeU_c3',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDhmfMOex8iVD-qiI6dXJx9qgHm1buwS5_-lz4L00MRyVK6o-Ua7V-cI56cNOWLwYtwcir4pFWAZTw0FfmRDpOHsvnJHDi2sQkX80cw83p0mJEZgEGN1zWIt-ZQqUw0dSbortL7bZ5uU5OIxAKQgHG-Ya13JJgXSLtTi930fOEGzLqhikn8jlDYGx4YoaNpZ6hf5HCzpNQzVTPSsDVtX5hY0OJid1EBNzSxluIJZx5OkBh-qYCuec3e',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBckgi82pc02DTdVDS4h4Kk0af4ti6XnB3XKt9cS6K_-S5dYWLVpqup-aKl37jVo8GvyP4lnQhZJzljaHgKgqatK608jT_B92GK4m3dkb3mCjrmPghEDrbACtnYx2nfuFUOK578_KznaPXZP8Ch5Y1w6XUOC3q-79XsvrhGw5n3CV6lAq7RxvkUPeWzcl21GhUIb17O2E5n9SQ8DwTy4_EqKLKWDyjW2fkkfKXnlnWXjRkvSyhmTywE',
  ],
  shows: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB61cdl1yLu0LofBvAcsUiptEaN2xwpXnfmKX6xhCBwRRkR-lqdFRAhS6fNuzN_lJZglbXN83P8ID2P9GugMTWPkjwQn5edDmTjohISR92FIC_Nx3kcWDZJIQUpIwi7pB1JFbWNpcIjPekRY4r_FA1NqzFfhkIVvsFzRafRcNky1kWNSwJg_oU2xODBW3-yhecSBFmUdFFVU0HwJBbzB4Qac1I1dZFl93mNAiVgHyflSgGOzGal3oSs',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCI6zFeKCIfljC-K-c7CUxYWm4wDdCHHv5UDE8hqAzJYKTlDMAdjoXWJuVOZXwu_034RuSvn1RVu-UWAHNrvU0FmQrDTfePwPz6MCxtBcpRAYWUiMtjkEBTzCLi_35I9py_9FqScZLdk5rVnr1-yHFWfFXAOXWgOyvIHGI_y_SdqNu-MgdHGm6hxzdgdyUte9ZaNDRa-a2-ud1rKyPeXICtCytRxwbQqmpOURtNSweGAZr10sMnzBUd',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCQgyRUD-L4mm56W2Kl337MYOQ_u-moXf0OoPBup722kLm3Q6xv7jpqV0zA2bnU_GarXrJWwd6zQhCQPxNnpJ-jE63HVijZoTVRFdG-JmDsNg9Pwe8hnSDiMTHKPzLNGaV5I_IGpmJkbVVoLBceXVN91anfazlcenkSvRd8VDmKLeWiSnG7AzhHWJrTiiZQT5BoxBsuxFsrF-byS-tIbX0bh8V7ALuo7saNT58ETw1e9NY32cCIDrxd',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA1pSfDRynapzqqVTzU6VoFIlpZtgJnuTRWvcQxYeTJMFViMVBEO_O5WfdOaWoP8GLkIm56HInYKN_zeGVbKQ-Jx-pb__97iy9SxHlCydnXA1LtgHigI65M73Km2GcxsE5hwPiXsBt3ZKY4h7-BWWlvCUZOrYLCOh6Qk7gDOFpYvEW_nvtznQGZbqMtvARRJUI3kFVuByFms8nE_v0BqtNq19Nak6p_8mr9ppeEWxYxSK7wYyDWMIi2',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ7C7p5Y-FQip8HPemiCRj60Sr7PKDWAutHhwqK_QcsvaOTZyVkwZn4M9iQZcJpQRwS0Ye2JJd_0wK53vNfK0wZZ3wGh0RKvW579q89VgqJO4OzGyI43w4uhW_MNjSl42v00PO30hk4M5AVvq6jMrTvUBgFfNYbqSmtwMQxQmqj2grEBPw5RlzOrhKwZU4KgO29p6i5Ywyj-zHt2knZcMGlUJGDxw1J6fC2N3ns_YnQeizQVS1k_1g',
  ],
};

// Package the imagery with the app instead of relying on short-lived external
// design URLs.  These are used by the secondary screens too, so every route
// has a reliable visual while deployed on Vercel.
source.podcasts = [source.homePodcasts, source.homeFavourite, source.homePodcasts, source.homeFavourite, source.homePodcasts, source.homeFavourite];
source.shows = [source.homeShows, source.homeFavourite, source.homeShows, source.homeFavourite, source.homeShows];

// Expo resolves bundled images to an object on web (rather than a numeric
// resource id). Preserve that object; only remote URLs need a `uri` wrapper.
const imageSource = (image) => (typeof image === 'string' ? { uri: image } : image);

const tracks = [
  { title: 'SMA', artist: 'Nasty C feat. Rowlene', art: source.daily, videoId: '3V8wZItHf3A' },
  { title: 'Water', artist: 'Tyla', art: source.homeDaily, videoId: 'XoiOOiuH8iI' },
  { title: 'Imithandazo', artist: 'Kabza De Small & Mthunzi', art: source.daily, videoId: 'KKIE9i-U8WE' },
  { title: 'Mnike', artist: 'Tyler ICU & Tumelo.za', art: source.homeFavourite, videoId: 'HcC2t2t2Bpg' },
];

const podcastCards = [
  ['Podcast and Chill with MacG', "South Africa's #1 Talk Show", source.podcasts[0]],
  ['What Now? Trevor Noah', 'Candid Conversations', source.podcasts[1]],
  ['The Penuel Show', 'Critical Thinking & Culture', source.podcasts[2]],
  ['Wisdom & Wellness', 'Mpoomy · Growth, Healing & Spirit', source.podcasts[3]],
  ['Popcorn & Cheese', 'Robot Boii · Entertainment & Banter', source.podcasts[4]],
  ['African History Extra', 'Untold Continental Stories', source.podcasts[5]],
];

const shows = [
  ['SEASON 4 OUT NOW', 'Blood & Water', 'Mystery · High School Drama · Cape Town', source.shows[0]],
  ['NEW EPISODE DAILY', 'Empini', 'Action Thriller · Private Security Saga', source.shows[1]],
  ['CRIME THRILLER', 'Red Ink', 'Investigative Suspense · Novel Adaptation', source.shows[2]],
  ['PREVIEW · PREMIERES FRIDAY', 'Love Never Lies: South Africa', 'Reality · Romance · Lie Detector Series', source.shows[3]],
  ['TOP 10 · FAN FAVOURITE', 'Redemption', 'Telenovela · Family Dynasty Drama', source.shows[4]],
];

// This screen follows the Stitch "All Time Favourites" composition.  Keep the
// library feed separate from the latest-shows feed so navigating between the
// two never renders the same cards in a different order.
const favouriteShows = [
  ['CRIME THRILLER', 'Red Ink', 'Investigative Suspense · Novel Adaptation', source.shows[2]],
  ['WATCHED DAILY', 'Love Never Lies: South Africa', 'Reality · Romance · Lie Detector Series', source.shows[3]],
  ['RETURNING SOON', 'Redemption', 'Telenovela · Family Dynasty Drama', source.shows[4]],
];

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [activeTrack, setActiveTrack] = useState(null);
  const [theme, setTheme] = useState('light');
  C = theme === 'dark' ? DARK : LIGHT;
  styles = buildStyles(C);

  const openTrack = (track) => setActiveTrack(track);
  const closePlayer = () => setActiveTrack(null);

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      {screen === 'welcome' && <Welcome onContinue={() => setScreen('signup')} onSignIn={() => setScreen('signin')} />}
      {screen === 'signup' && <AuthScreen mode="signup" onComplete={() => setScreen('home')} onSwitch={() => setScreen('signin')} />}
      {screen === 'signin' && <AuthScreen mode="signin" onComplete={() => setScreen('home')} onSwitch={() => setScreen('signup')} onQuickLogin={() => setScreen('quickLogin')} />}
      {screen === 'quickLogin' && <QuickLogin onBack={() => setScreen('signin')} onComplete={() => setScreen('home')} />}
      {['home', 'daily', 'podcasts', 'shows', 'favourites'].includes(screen) && (
        <AppShell screen={screen} onNavigate={setScreen} isDark={theme === 'dark'} onToggleTheme={() => setTheme((value) => value === 'dark' ? 'light' : 'dark')}>
          {screen === 'home' && <Home onNavigate={setScreen} onOpenTrack={openTrack} />}
          {screen === 'daily' && <DailyMusic onBack={() => setScreen('home')} onOpenTrack={openTrack} />}
          {screen === 'podcasts' && <Podcasts onBack={() => setScreen('home')} />}
          {screen === 'shows' && <Shows onBack={() => setScreen('home')} />}
          {screen === 'favourites' && <Favourites onBack={() => setScreen('home')} />}
        </AppShell>
      )}
      {activeTrack && <Player track={activeTrack} onClose={closePlayer} />}
    </SafeAreaView>
  );
}

function Welcome({ onContinue, onSignIn }) {
  return (
    <View style={styles.welcome}>
      <Image source={{ uri: source.welcome }} style={styles.welcomeImage} />
      <View style={styles.welcomeSheet}>
        <Text style={styles.welcomeTitle}>From Africa,{`\n`}For the World</Text>
        <Pressable accessibilityRole="button" style={styles.primaryPill} onPress={onContinue}>
          <Text style={styles.primaryPillText}>CLICK</Text>
          <Ionicons name="arrow-forward-circle-outline" size={23} color={C.paper} />
        </Pressable>
        <Pressable accessibilityRole="button" onPress={onSignIn} hitSlop={12}>
          <Text style={styles.alreadyMember}>Already have an account? <Text style={styles.blueText}>Sign in</Text></Text>
        </Pressable>
      </View>
    </View>
  );
}

function AuthScreen({ mode, onComplete, onSwitch, onQuickLogin }) {
  const isSignup = mode === 'signup';
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [notice, setNotice] = useState('');

  const submit = () => {
    if (!email.trim().includes('@')) return setNotice('Enter a valid email address.');
    if (isSignup && mobile.replace(/\D/g, '').length < 9) return setNotice('Enter a valid mobile number.');
    if (password.length < 6) return setNotice('Password must contain at least 6 characters.');
    onComplete();
  };

  return (
    <View style={styles.authScreen}>
      {isSignup ? <View style={styles.authDome} /> : null}
      <View style={[styles.authTop, !isSignup && styles.signinTop]}>
        {!isSignup && <Pressable accessibilityRole="button" onPress={onSwitch} style={styles.backButton}><Ionicons name="arrow-back" size={26} color={C.ink} /></Pressable>}
        <Brand dark />
      </View>
      <ScrollView contentContainerStyle={styles.authScroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text style={styles.authTitle}>{isSignup ? <><Text style={styles.blueText}>Create</Text> An Account</> : <>Sign In To Your Account</>}</Text>
        <Text style={styles.authSubtitle}>{isSignup ? 'Your music, your people, your sound.' : 'Welcome back. Your sound is waiting.'}</Text>
        <InputField label="Email Address" placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" icon="mail-outline" />
        <InputField label="Mobile Number" placeholder="Mobile Number" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" icon="call-outline" optional={!isSignup} />
        <InputField label="Password" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!visible} icon="lock-closed-outline" trailing={visible ? 'eye-outline' : 'eye-off-outline'} onTrailing={() => setVisible(!visible)} />
        <View style={styles.checkRow}>
          <View style={styles.checkBox}><Ionicons name="checkmark" size={13} color={C.paper} /></View>
          <Text style={styles.checkLabel}>{isSignup ? 'I agree to the terms and conditions' : 'Remember me'}</Text>
          {!isSignup && <Text style={styles.helpText}>Need Help?</Text>}
        </View>
        {notice ? <Text accessibilityLiveRegion="polite" style={styles.formNotice}>{notice}</Text> : null}
        {!isSignup ? <Pressable onPress={onQuickLogin} style={styles.quickLink}><Text style={styles.quickLinkText}>Use Google, Apple or phone instead</Text></Pressable> : null}
      </ScrollView>
      <View style={[styles.authFooter, isSignup && styles.signupFooter]}>
        <Pressable accessibilityRole="button" style={[styles.authButton, isSignup && styles.signupButton]} onPress={submit}>
          <Text style={styles.authButtonText}>{isSignup ? 'Sign Up' : 'Sign In'}</Text>
          {!isSignup && <Ionicons name="arrow-forward" size={22} color={C.paper} />}
        </Pressable>
        {!isSignup ? <Pressable onPress={onSwitch}><Text style={styles.switchAuth}>Don't have an account? <Text style={styles.blueText}>Sign Up</Text></Text></Pressable> : null}
      </View>
    </View>
  );
}

function InputField({ label, optional, icon, trailing, onTrailing, ...props }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.fieldLabel}>{label}{optional ? <Text style={styles.optional}> · Optional</Text> : null}</Text>
      <View style={styles.inputBox}>
        <Ionicons name={icon} size={19} color={C.slate} />
        <TextInput {...props} placeholderTextColor="#9AA5B5" style={styles.input} accessibilityLabel={label} />
        {trailing ? <Pressable onPress={onTrailing} accessibilityLabel="Show or hide password" hitSlop={10}><Ionicons name={trailing} size={20} color={C.slate} /></Pressable> : null}
      </View>
    </View>
  );
}

function QuickLogin({ onBack, onComplete }) {
  return (
    <View style={styles.quickScreen}>
      <View style={styles.quickHeader}><Pressable onPress={onBack}><Ionicons name="arrow-back" size={26} color={C.ink} /></Pressable><Brand dark /></View>
      <ScrollView contentContainerStyle={styles.quickContent} showsVerticalScrollIndicator={false}>
        <View style={styles.livePill}><Text style={styles.livePillText}>🎶 LISTENING PARTY LIVE · 2.4k tuned in</Text></View>
        <Image source={imageSource(source.homeDaily)} style={styles.quickHero} />
        <Text style={styles.quickOverline}>🔥 AMAPIANO WAVE SA</Text>
        <Text style={styles.quickTitle}>Welcome Back</Text>
        <Text style={styles.quickCopy}>Join listening parties, stream live mixes, and vibe with friends.</Text>
        <SocialButton icon="logo-google" label="Continue with Google" onPress={onComplete} />
        <SocialButton icon="logo-apple" label="Continue with Apple" onPress={onComplete} />
        <SocialButton icon="chatbubble-ellipses-outline" label="Use Phone Number" onPress={onComplete} />
        <View style={styles.orRow}><View style={styles.orLine} /><Text style={styles.orText}>or use your credentials</Text><View style={styles.orLine} /></View>
        <Pressable style={styles.emailEntry} onPress={onBack}><Ionicons name="mail-outline" color={C.ink} size={20} /><Text style={styles.emailEntryText}>Sign In with Email</Text></Pressable>
        <Text style={styles.legalCopy}>By continuing, you agree to Afritune's Terms of Service and acknowledge our Privacy Policy.</Text>
      </ScrollView>
    </View>
  );
}

function SocialButton({ icon, label, onPress }) {
  return <Pressable onPress={onPress} style={styles.socialButton}><Ionicons name={icon} size={21} color={C.ink} /><Text style={styles.socialText}>{label}</Text><Ionicons name="chevron-forward" size={19} color={C.slate} /></Pressable>;
}

function Brand({ dark = false }) {
  return (
    <View style={styles.brand}>
      <MaterialCommunityIcons name="microphone" size={25} color={dark ? C.ink : C.blue} />
      <Text style={[styles.brandText, { color: dark ? C.ink : C.blue }]}>AFRITUNE</Text>
    </View>
  );
}

function AppShell({ screen, onNavigate, children, isDark, onToggleTheme }) {
  return (
    <View style={styles.shell}>
      <View style={styles.shellHeader}><Image source={{ uri: source.avatar }} style={styles.avatar} /><Brand /><Pressable accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'} onPress={onToggleTheme} style={styles.themeToggle}><Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={25} color={C.ink} /></Pressable></View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
      <BottomNav screen={screen} onNavigate={onNavigate} />
    </View>
  );
}

function TopPageHeader({ title, onBack }) {
  return <><View style={styles.pageHeader}><Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack}><Ionicons name="arrow-back" size={26} color={C.ink} /></Pressable><Text style={styles.pageTitle}>{title}</Text><Pressable accessibilityLabel="Search"><Feather name="search" size={22} color={C.ink} /></Pressable></View></>;
}

function Home({ onNavigate, onOpenTrack }) {
  const cards = [
    ['daily', source.homeDaily, 'Daily Music & Playlists'],
    ['podcasts', source.homePodcasts, 'Podcasts & Episodes'],
    ['shows', source.homeShows, 'Latest Shows & Series'],
    ['favourites', source.homeFavourite, 'All Time Favourite'],
  ];
  return (
    <View>
      <View style={styles.searchBar}><TextInput accessibilityLabel="Search Afritune" placeholder="Search..." placeholderTextColor={C.slate} style={styles.searchInput} /><Pressable style={styles.searchAction}><Feather name="search" size={19} color={C.paper} /></Pressable></View>
      <Pressable accessibilityRole="button" accessibilityLabel="Open now playing" style={styles.miniPlayer} onPress={() => onOpenTrack(tracks[0])}>
        <Image source={imageSource(tracks[0].art)} style={styles.miniPlayerArt} />
        <View style={styles.miniPlayerCopy}><Text style={styles.miniPlayerLabel}>NOW PLAYING</Text><Text style={styles.miniPlayerTitle}>{tracks[0].title} · {tracks[0].artist}</Text></View>
        <View style={styles.miniPlayerPlay}><Ionicons name="play" size={18} color={C.paper} /></View>
      </Pressable>
      <View style={styles.homeCards}>{cards.map(([route, image, label]) => <Pressable accessibilityRole="button" accessibilityLabel={label} key={route} style={styles.homeCard} onPress={() => onNavigate(route)}><Image source={imageSource(image)} style={styles.homeCardImage} /></Pressable>)}</View>
    </View>
  );
}

function DailyMusic({ onBack, onOpenTrack }) {
  return (
    <View>
      <TopPageHeader title="Daily Music & Playlists" onBack={onBack} />
      <View style={styles.lossless}><MaterialCommunityIcons name="graphic-eq" size={21} color={C.blue} /><Text style={styles.losslessText}>LOSSLESS 24-BIT</Text></View>
      <View style={styles.albumPanel}>
        <Image source={imageSource(source.daily)} style={styles.albumArt} />
        <View style={styles.albumInfo}><Text style={styles.genre}>AFROBEATS • RAP</Text><Text style={styles.albumTitle}>SMA</Text><Text style={styles.albumArtist}>Nasty C feat. Rowlene</Text><Pressable accessibilityLabel="Favourite SMA"><Ionicons name="heart-outline" size={25} color={C.ink} /></Pressable></View>
      </View>
      <View style={styles.progressLabels}><Text>01:24</Text><Text>03:45</Text></View><View style={styles.progressTrack}><View style={styles.progressFill} /></View>
      <View style={styles.transport}><Ionicons name="shuffle" size={22} color={C.ink} /><Ionicons name="play-skip-back" size={23} color={C.ink} /><Pressable style={styles.playButton} onPress={() => onOpenTrack(tracks[0])}><Ionicons name="play" size={24} color={C.paper} /></Pressable><Ionicons name="play-skip-forward" size={23} color={C.ink} /><Ionicons name="repeat" size={22} color={C.ink} /></View>
      <View style={styles.releaseBox}><View><Text style={styles.releaseLabel}>Upcoming Release</Text><Text style={styles.releaseTitle}>EXCLUSIVE New Drop: Nasty C x Kabza De Small</Text></View><View style={styles.countdown}><Text style={styles.countNumber}>04</Text><Text style={styles.countTiny}>DAYS</Text></View></View>
      <Text style={styles.sectionTitle}>Amapiano & Afrobeats</Text>
      {tracks.map((track, index) => <TrackRow key={`${track.title}-${index}`} track={track} number={index + 1} onPress={() => onOpenTrack(track)} />)}
    </View>
  );
}

function TrackRow({ track, number, onPress }) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={styles.trackRow}><Text style={styles.trackNumber}>{String(number).padStart(2, '0')}</Text><Image source={imageSource(track.art)} style={styles.trackArt} /><View style={styles.trackCopy}><Text style={styles.trackTitle}>{track.title}</Text><Text style={styles.trackArtist}>{track.artist}</Text></View><Ionicons name="play-circle-outline" size={27} color={C.blue} /></Pressable>;
}

function Podcasts({ onBack }) {
  return <View><TopPageHeader title="Podcasts and Episodes" onBack={onBack} /><Text style={styles.contentLead}>Stories, culture and conversations from the continent.</Text><View style={styles.podcastGrid}>{podcastCards.map(([title, subtitle, image]) => <View key={title} style={styles.podcastCard}><Image source={imageSource(image)} style={styles.podcastImage} /><Text style={styles.podcastTitle}>{title}</Text><Text style={styles.podcastSubtitle}>{subtitle}</Text><Pressable style={styles.listenLink}><Ionicons name="play-circle" size={16} color={C.blue} /><Text style={styles.listenText}>Listen now</Text></Pressable></View>)}</View></View>;
}

function Shows({ onBack }) {
  return <View><TopPageHeader title="Latest Shows & Series" onBack={onBack} /><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>{['All Series', 'Nollywood & Drama', 'Reality TV', 'Action & Crime'].map((label, index) => <View key={label} style={[styles.chip, index === 0 && styles.activeChip]}><Text style={[styles.chipText, index === 0 && styles.activeChipText]}>{label}</Text></View>)}</ScrollView><ShowSection title="Your Daily picks" card={shows[0]} /><ShowSection title="Watched Daily" card={shows[1]} /><ShowSection title="Trending Drama" card={shows[2]} /><ShowSection title="Returning Soon" card={shows[3]} /></View>;
}

function Favourites({ onBack }) {
  return <View><TopPageHeader title="All Time Favourites" onBack={onBack} /><View style={styles.favouriteBanner}><Ionicons name="heart" size={21} color={C.gold} /><Text style={styles.favouriteBannerText}>Your saved screen favourites</Text></View><ShowSection card={favouriteShows[0]} /><ShowSection title="Watched Daily" card={favouriteShows[1]} /><ShowSection title="Returning Soon" card={favouriteShows[2]} /></View>;
}

function ShowSection({ title, card }) {
  const [eyebrow, name, meta, image] = card;
  return <View style={styles.showSection}>{title ? <View style={styles.showHeading}><Text style={styles.sectionTitle}>{title}</Text><Text style={styles.seeAll}>SEE ALL</Text></View> : null}<Pressable style={styles.showCard}><Image source={imageSource(image)} style={styles.showImage} /><View style={styles.showShade} /><View style={styles.showContent}><Text style={styles.showEyebrow}>{eyebrow}</Text><Text style={styles.showName}>{name}</Text><Text style={styles.showMeta}>{meta}</Text><View style={styles.showPlay}><Ionicons name="play" size={18} color={C.ink} /></View></View></Pressable></View>;
}

function BottomNav({ screen, onNavigate }) {
  const items = [
    ['daily', require('./assets/icon-add.png'), 'Create'],
    ['podcasts', require('./assets/icon-podcasts.png'), 'Podcasts'],
    ['home', require('./assets/icon-home.png'), 'Home'],
    ['shows', require('./assets/icon-shows.png'), 'Watch'],
    ['favourites', require('./assets/icon-list.png'), 'Library'],
  ];
  return <View style={styles.nav}>{items.map(([id, icon, label]) => <Pressable key={id} accessibilityRole="tab" accessibilityLabel={label} accessibilityState={{ selected: id === screen }} onPress={() => onNavigate(id)} style={styles.navButton}><Image source={icon} style={[styles.navIcon, { tintColor: id === screen ? C.blue : C.ink }]} /><View style={[styles.navDot, id === screen && styles.navDotActive]} /></Pressable>)}</View>;
}

function Player({ track, onClose }) {
  const [playing, setPlaying] = useState(true);
  const [position, setPosition] = useState(17);
  const duration = 240;
  useEffect(() => {
    if (!playing) return undefined;
    const timer = setInterval(() => setPosition((value) => (value >= duration ? 0 : value + 1)), 1000);
    return () => clearInterval(timer);
  }, [playing]);
  const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  const progress = `${Math.round((position / duration) * 100)}%`;
  return <View style={styles.playerOverlay}><View style={styles.playerTop}><Pressable onPress={onClose} accessibilityLabel="Close player" hitSlop={12}><Ionicons name="arrow-back" size={24} color="#293B5A" /></Pressable><Text style={styles.nowPlaying}>Now Playing</Text><Pressable accessibilityLabel="More player options" hitSlop={12}><Ionicons name="ellipsis-horizontal" size={20} color="#293B5A" /></Pressable></View><View style={styles.playerCarousel}><View style={styles.playerSideArt} /><Image source={imageSource(track.art)} style={styles.playerArt} /><View style={styles.playerSideArt} /></View><Text style={styles.playerName}>{track.title}</Text><Text style={styles.playerArtist}>{track.artist}</Text><View style={styles.waveWrap}>{Array.from({ length: 30 }).map((_, index) => { const arc = Math.sin((index / 29) * Math.PI); return <View key={index} style={[styles.waveBar, { height: 17 + Math.round(73 * arc), backgroundColor: index < 15 ? C.gold : '#DEE5ED' }]} />; })}</View><View style={styles.playerProgress}><View style={[styles.playerProgressFill, { width: progress }]} /><View style={[styles.playerThumb, { left: progress }]} /></View><View style={styles.playerTimes}><Text style={styles.elapsedTime}>{formatTime(position)}</Text><Text style={styles.totalTime}>{formatTime(duration)}</Text></View><View style={styles.playerControls}><Pressable accessibilityLabel="Shuffle"><Ionicons name="shuffle" size={22} color="#B5BFD0" /></Pressable><Pressable accessibilityLabel="Previous track" onPress={() => setPosition(Math.max(0, position - 10))}><Ionicons name="play-skip-back" size={24} color="#B5BFD0" /></Pressable><Pressable accessibilityLabel={playing ? 'Pause' : 'Play'} onPress={() => setPlaying(!playing)} style={styles.playerMainControl}><Ionicons name={playing ? 'pause' : 'play'} size={29} color={C.paper} /></Pressable><Pressable accessibilityLabel="Next track" onPress={() => setPosition(Math.min(duration, position + 10))}><Ionicons name="play-skip-forward" size={24} color="#B5BFD0" /></Pressable><Pressable accessibilityLabel="Favourite"><Ionicons name="heart" size={22} color="#F04747" /></Pressable></View><Pressable style={styles.lyricsButton}><Ionicons name="chevron-up" size={17} color={C.blue} /><Text style={styles.lyricsText}>Lyrics</Text></Pressable></View>;
}

let styles;
function buildStyles(C) { return StyleSheet.create({
  app: { flex: 1, backgroundColor: C.paper },
  welcome: { flex: 1, backgroundColor: C.blue },
  welcomeImage: { flex: 1, width: '100%', resizeMode: 'cover' },
  welcomeSheet: { minHeight: 290, marginTop: -24, backgroundColor: C.paper, borderTopLeftRadius: 38, borderTopRightRadius: 38, paddingHorizontal: 32, paddingTop: 38, paddingBottom: 28, justifyContent: 'space-between' },
  welcomeTitle: { color: C.ink, fontWeight: '800', fontSize: 34, lineHeight: 40, textAlign: 'center', letterSpacing: -0.7 },
  primaryPill: { height: 58, marginTop: 24, borderRadius: 30, backgroundColor: C.actionBlue, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 9 },
  primaryPillText: { color: C.paper, fontSize: 17, fontWeight: '800', letterSpacing: 0.9 },
  alreadyMember: { color: C.slate, textAlign: 'center', fontSize: 13, marginTop: 16, fontWeight: '600' },
  blueText: { color: C.blue },
  authScreen: { flex: 1, backgroundColor: C.paper, overflow: 'hidden' },
  authDome: { position: 'absolute', top: 0, left: '-20%', width: '140%', height: 198, backgroundColor: C.blue, borderBottomLeftRadius: 360, borderBottomRightRadius: 360 },
  authTop: { alignItems: 'center', paddingTop: 38, minHeight: 175 },
  signinTop: { minHeight: 88, justifyContent: 'center', paddingTop: 18 },
  backButton: { position: 'absolute', left: 23, top: 23, zIndex: 2, padding: 4 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  brandText: { fontSize: 21, fontWeight: '900', letterSpacing: 1.2 },
  authScroll: { paddingHorizontal: 30, paddingTop: 4, paddingBottom: 18, flexGrow: 1 },
  authTitle: { color: C.ink, fontWeight: '800', textAlign: 'center', fontSize: 29, letterSpacing: -0.6 },
  authSubtitle: { color: C.slate, fontSize: 14, textAlign: 'center', marginTop: 9, marginBottom: 26 },
  inputGroup: { marginBottom: 15 },
  fieldLabel: { color: C.ink, fontSize: 13, fontWeight: '800', marginBottom: 7, marginLeft: 3 },
  optional: { color: C.muted, fontWeight: '600' },
  inputBox: { minHeight: 51, borderWidth: 1.2, borderColor: C.blue, borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 10 },
  input: { flex: 1, fontSize: 15, color: C.ink, paddingVertical: 11 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginTop: 1, gap: 8 },
  checkBox: { width: 18, height: 18, borderRadius: 4, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' },
  checkLabel: { color: C.ink, fontSize: 12, fontWeight: '700', flex: 1 },
  helpText: { color: C.blue, fontSize: 12, fontWeight: '800' },
  formNotice: { color: '#B42318', fontWeight: '700', fontSize: 12, marginTop: 13, textAlign: 'center' },
  quickLink: { alignSelf: 'center', marginTop: 18 },
  quickLinkText: { color: C.blue, fontSize: 13, fontWeight: '800' },
  authFooter: { paddingHorizontal: 30, paddingBottom: 24, paddingTop: 8 },
  signupFooter: { paddingHorizontal: 0, paddingBottom: 0, paddingTop: 0, minHeight: 106, justifyContent: 'flex-end', overflow: 'hidden' },
  authButton: { minHeight: 56, backgroundColor: C.ink, borderRadius: 28, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  signupButton: { borderTopLeftRadius: 90, borderTopRightRadius: 90, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, backgroundColor: C.blue, minHeight: 92, paddingBottom: 15 },
  authButtonText: { color: C.paper, fontSize: 18, fontWeight: '800' },
  switchAuth: { color: C.slate, fontSize: 13, textAlign: 'center', fontWeight: '700', marginTop: 15 },
  quickScreen: { flex: 1, backgroundColor: C.paper },
  quickHeader: { height: 72, paddingHorizontal: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: C.line },
  quickContent: { padding: 24, paddingBottom: 42 },
  livePill: { alignSelf: 'center', backgroundColor: '#FFF7DD', borderRadius: 18, paddingHorizontal: 13, paddingVertical: 8, marginBottom: 18 },
  livePillText: { color: '#896400', fontSize: 11, fontWeight: '900' },
  quickHero: { height: 185, borderRadius: 20, width: '100%', resizeMode: 'cover' },
  quickOverline: { color: C.blue, fontSize: 12, fontWeight: '900', marginTop: 20, letterSpacing: 0.6 },
  quickTitle: { color: C.ink, fontSize: 32, fontWeight: '900', marginTop: 6 },
  quickCopy: { color: C.slate, lineHeight: 21, fontSize: 15, marginTop: 7, marginBottom: 20 },
  socialButton: { minHeight: 57, borderRadius: 13, borderWidth: 1, borderColor: C.line, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 17, marginBottom: 11 },
  socialText: { flex: 1, marginLeft: 12, fontSize: 15, color: C.ink, fontWeight: '800' },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 17 },
  orLine: { height: 1, backgroundColor: C.line, flex: 1 },
  orText: { color: C.muted, fontSize: 11, fontWeight: '700' },
  emailEntry: { minHeight: 54, borderRadius: 27, backgroundColor: C.ink, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  emailEntryText: { color: C.paper, fontWeight: '800', fontSize: 15 },
  legalCopy: { color: C.muted, fontSize: 11, lineHeight: 17, textAlign: 'center', marginTop: 19 },
  shell: { flex: 1, backgroundColor: C.paper },
  shellHeader: { height: 79, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: C.line },
  themeToggle: { height: 42, width: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: C.soft },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: C.sky },
  scrollContent: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 103 },
  searchBar: { height: 56, backgroundColor: '#EFEFEF', borderRadius: 29, paddingLeft: 20, paddingRight: 8, alignItems: 'center', flexDirection: 'row', marginBottom: 19 },
  searchInput: { flex: 1, color: C.ink, fontSize: 16 },
  searchAction: { height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2C2C2E' },
  miniPlayer: { minHeight: 68, borderRadius: 15, padding: 8, marginBottom: 16, borderWidth: 1, borderColor: '#D6EFFB', flexDirection: 'row', alignItems: 'center', gap: 11 },
  miniPlayerArt: { width: 52, height: 52, borderRadius: 10, resizeMode: 'cover' },
  miniPlayerCopy: { flex: 1 },
  miniPlayerLabel: { color: C.blue, fontSize: 10, fontWeight: '900', letterSpacing: 1.1 },
  miniPlayerTitle: { color: C.ink, fontSize: 13, fontWeight: '800', marginTop: 4 },
  miniPlayerPlay: { width: 39, height: 39, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: C.blue },
  homeCards: { gap: 16 },
  homeCard: { height: 176, overflow: 'hidden', borderRadius: 17 },
  homeCardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  pageHeader: { minHeight: 55, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  pageTitle: { color: C.ink, fontWeight: '900', fontSize: 22, letterSpacing: -0.4 },
  lossless: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 5, marginBottom: 13 },
  losslessText: { color: C.blue, fontWeight: '900', fontSize: 12, letterSpacing: 1.1 },
  albumPanel: { flexDirection: 'row', borderRadius: 17, overflow: 'hidden', borderWidth: 1, borderColor: C.line, padding: 14, gap: 14 },
  albumArt: { height: 158, width: 158, borderRadius: 12, resizeMode: 'cover' },
  albumInfo: { flex: 1, justifyContent: 'center' },
  genre: { color: C.blue, fontSize: 10, fontWeight: '900', letterSpacing: 0.7 },
  albumTitle: { color: C.ink, fontSize: 28, fontWeight: '900', marginTop: 6 },
  albumArtist: { color: C.slate, fontSize: 13, lineHeight: 18, marginTop: 4, marginBottom: 14 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  progressTrack: { height: 4, borderRadius: 2, backgroundColor: '#D9E1E7', marginTop: 8 },
  progressFill: { height: 4, borderRadius: 2, backgroundColor: C.blue, width: '34%' },
  transport: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 22, marginVertical: 20 },
  playButton: { width: 55, height: 55, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: C.ink },
  releaseBox: { backgroundColor: C.sky, borderRadius: 16, padding: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  releaseLabel: { color: C.blue, fontSize: 11, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 0.6 },
  releaseTitle: { color: C.ink, fontSize: 14, fontWeight: '800', marginTop: 5, maxWidth: 215, lineHeight: 19 },
  countdown: { backgroundColor: C.paper, width: 56, height: 56, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  countNumber: { color: C.ink, fontSize: 21, fontWeight: '900' },
  countTiny: { color: C.slate, fontSize: 9, fontWeight: '900', letterSpacing: 0.6 },
  sectionTitle: { color: C.ink, fontSize: 20, fontWeight: '900', marginTop: 27, marginBottom: 12 },
  trackRow: { height: 72, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: C.line, gap: 11 },
  trackNumber: { color: C.muted, width: 22, fontSize: 12, fontWeight: '800' },
  trackArt: { height: 47, width: 47, borderRadius: 8, resizeMode: 'cover' },
  trackCopy: { flex: 1 },
  trackTitle: { color: C.ink, fontSize: 15, fontWeight: '900' },
  trackArtist: { color: C.slate, fontSize: 12, marginTop: 3 },
  contentLead: { color: C.slate, fontSize: 15, lineHeight: 22, marginBottom: 19 },
  podcastGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 22 },
  podcastCard: { width: '47%' },
  podcastImage: { width: '100%', aspectRatio: 1, borderRadius: 16 },
  podcastTitle: { color: C.ink, fontWeight: '900', fontSize: 15, marginTop: 9, lineHeight: 20 },
  podcastSubtitle: { color: C.slate, fontSize: 11, marginTop: 4, lineHeight: 16 },
  listenLink: { marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 4 },
  listenText: { color: C.blue, fontWeight: '900', fontSize: 12 },
  chips: { gap: 9, paddingVertical: 7, paddingRight: 20 },
  chip: { borderWidth: 1, borderColor: C.line, paddingHorizontal: 13, paddingVertical: 8, borderRadius: 18 },
  activeChip: { backgroundColor: C.ink, borderColor: C.ink },
  chipText: { color: C.slate, fontSize: 12, fontWeight: '800' },
  activeChipText: { color: C.paper },
  showSection: { marginTop: 15 },
  showHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  seeAll: { color: C.blue, fontSize: 11, fontWeight: '900', marginTop: 18 },
  showCard: { height: 223, borderRadius: 18, overflow: 'hidden' },
  showImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  showShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(9, 19, 31, 0.23)' },
  showContent: { position: 'absolute', left: 18, right: 18, bottom: 17 },
  showEyebrow: { color: C.gold, fontWeight: '900', fontSize: 10, letterSpacing: 0.8 },
  showName: { color: C.paper, fontSize: 26, fontWeight: '900', marginTop: 3 },
  showMeta: { color: C.paper, fontSize: 12, fontWeight: '700', marginTop: 3, paddingRight: 46 },
  showPlay: { position: 'absolute', right: 0, bottom: 0, height: 43, width: 43, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: C.paper },
  favouriteBanner: { backgroundColor: '#FFF9E8', borderRadius: 14, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  favouriteBannerText: { color: '#806000', fontWeight: '900', fontSize: 13 },
  nav: { position: 'absolute', bottom: 0, left: 0, right: 0, minHeight: 75, backgroundColor: C.paper, borderTopWidth: 1, borderColor: C.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 8 },
  navButton: { height: 64, width: 54, alignItems: 'center', justifyContent: 'center' },
  navIcon: { width: 30, height: 30, resizeMode: 'contain' },
  navDot: { height: 3, width: 3, marginTop: 5, borderRadius: 2, backgroundColor: 'transparent' },
  navDotActive: { width: 17, backgroundColor: C.blue },
  playerOverlay: { ...StyleSheet.absoluteFillObject, zIndex: 20, backgroundColor: C.paper, paddingHorizontal: 28, paddingTop: 58 },
  playerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 3 },
  nowPlaying: { color: '#293B5A', fontSize: 19, fontWeight: '900', letterSpacing: .1 },
  playerCarousel: { height: 282, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, marginHorizontal: -28, overflow: 'hidden' },
  playerSideArt: { width: 55, height: 208, borderRadius: 25, backgroundColor: '#E7ECFF' },
  playerArt: { width: 230, height: 230, borderRadius: 15, resizeMode: 'cover', shadowColor: '#AAB5C4', shadowOffset: { width: 0, height: 11 }, shadowOpacity: .2, shadowRadius: 15, elevation: 7 },
  playerName: { color: '#293B5A', fontSize: 26, fontWeight: '900', textAlign: 'center', marginTop: 17 },
  playerArtist: { color: '#8493A7', fontSize: 17, fontWeight: '600', textAlign: 'center', marginTop: 6 },
  waveWrap: { height: 108, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 4, marginTop: 23 },
  waveBar: { width: 3, borderRadius: 2 },
  playerProgress: { height: 4, backgroundColor: '#DEE5ED', borderRadius: 4, marginTop: 5 },
  playerProgressFill: { height: 4, backgroundColor: C.gold, borderRadius: 4 },
  playerThumb: { position: 'absolute', top: -5, width: 14, height: 14, borderRadius: 7, backgroundColor: C.gold, marginLeft: -7, borderWidth: 3, borderColor: '#FFFFFF', shadowColor: '#8B98AA', shadowOpacity: .2, shadowRadius: 4, elevation: 2 },
  playerTimes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 9 },
  elapsedTime: { color: C.gold, fontSize: 12, fontWeight: '700' },
  totalTime: { color: '#293B5A', fontSize: 12, fontWeight: '700' },
  playerControls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, marginTop: 27 },
  playerMainControl: { height: 72, width: 72, borderRadius: 36, backgroundColor: C.gold, alignItems: 'center', justifyContent: 'center', shadowColor: C.gold, shadowOpacity: .38, shadowRadius: 16, elevation: 8 },
  lyricsButton: { alignSelf: 'center', alignItems: 'center', marginTop: 35 },
  lyricsText: { color: '#008CD1', fontSize: 16, fontWeight: '800', marginTop: 2 },
}); }
