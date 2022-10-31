# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create!([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create!(name: 'Luke', movie: movies.first)

# POSITIONS
Position.create!([
  {name: "Python разработчик"},
  {name: "Java разработчик"},
  {name: "Ruby разработчик"},
  {name: "С# разработчик"},
  {name: "JavaScript разработчик"},
  {name: "HR-менеджер"},
  {name: "Главный рекрутер"},
  {name: "Руководитель отдела разработки"},
  {name: "Директор"},
  {name: "Начальник КО"}
  ])


# NOMINATIONS
names = ["Мышь","Клавиатура","Монитор","Компьютер","Ноутбук",
          "Наушники","Планшет","Электронная книга","Микрофон",
          "Принтер","USB-флеш накопитель"]
path_to_icons = "#{Rails.root}/app/assets/images/icons/"

names.each_with_index do |n, idx|
  nomination = Nomination.create!( { name: n, shelf_time: rand(1.5 .. 3.6).round(1) } )
  nomination.icon.attach(io: File.open(path_to_icons+idx.to_s+".jpg"), filename: idx.to_s+".jpg"  )
end


# USERS
def rand_work_exp
  rand(0.0 .. 5.3).round(1)
end

path_to_avatars = "#{Rails.root}/app/assets/images/avatars/"
imgs = ["0.jpg", "1.jpg","2.jpg","3.jpg","4.jpg"]

  u = User.create!(
        {first_name: "Ирина", second_name: "Василенко", male: false, phone_number: "+375295689556",
            position_id: 6, email: "user1@gmail.com", work_experience: rand_work_exp,
             password: "admin123", password_confirmation: "admin123", jti: SecureRandom.uuid })
    u.created_at = Time.now-rand(13..15).month
    u.avatar.attach(io: File.open(path_to_avatars+imgs[0]), filename: imgs[0] ,content_type: 'image/jpeg'  )
    u.save


  u = User.create!({first_name: "Владимир", second_name: "Бойко", male: true, is_admin: true, phone_number: "+375295789859",
              position: Position.last, email: "admin123@gmail.com", work_experience: rand_work_exp,
               password: "admin123", password_confirmation: "admin123", jti: SecureRandom.uuid})
    u.created_at = Time.now-rand(13..15).month
    u.avatar.attach(io: File.open(path_to_avatars+imgs[1]), filename: imgs[1],content_type: 'image/jpeg'  )
    u.save


  u = User.create!(
    {first_name: "Евгений", second_name: "Новенький", male: true, phone_number: "+375337899511",
position_id: 3, email: "user2@gmail.com", work_experience: rand_work_exp,
       password: "admin123", password_confirmation: "admin123", jti: SecureRandom.uuid}
  )
  u.created_at = Time.now-rand(13..15).month
    u.avatar.attach(io: File.open(path_to_avatars+imgs[2]), filename: imgs[2],content_type: 'image/jpeg'  )
  u.save


  u = User.create!(
    {first_name: "Аркадий", second_name: "Беларченко", male: true, phone_number: "+375337897544",
position_id: 2, email: "user3@gmail.com", work_experience: rand_work_exp,
       password: "admin123", password_confirmation: "admin123", jti: SecureRandom.uuid}
  )
  u.created_at = Time.now-rand(13..15).month
        u.avatar.attach(io: File.open(path_to_avatars+imgs[3]), filename: imgs[3] ,content_type: 'image/jpeg' )
      u.save


  u = User.create!(
    {first_name: "Анастасия", second_name: "Немцова", male: false, phone_number: "+375447891122",
     position_id: 4, email: "user4@gmail.com", work_experience: rand_work_exp,
      password: "admin123", password_confirmation: "admin123", jti: SecureRandom.uuid}
  )
  u.created_at = Time.now-rand(13..15).month
        u.avatar.attach(io: File.open(path_to_avatars+imgs[4]), filename: imgs[4],content_type: 'image/jpeg'  )
      u.save


  u = User.create!(
      {first_name: "Тимур", second_name: "Босак", male: true, phone_number: "+375447894568",
       position_id: 5, email: "user5@gmail.com", work_experience: rand_work_exp,
        password: "admin123", password_confirmation: "admin123", jti: SecureRandom.uuid}
      )
  u.created_at = Time.now-rand(13..15).month
      u.save

# BREAKDOWN CAUSES
BreakdownCause.create!([
  {body: "Естественный износ"},
  {body: "Брак (не работает после распаковки)"},
  {body: "Устройство перестало включаться после длительного простоя"},
  {body: "В устройство попала вода"},
  {body: "Было сломано по случайности"},
  {body: "Другая причина"}
  ])

# UNITS
  def prev_created_time
      Time.now-rand(4..12).month+rand(1..30).day
  end

units = [
    # User 1
  {
    nomination_id: 1 , cost: 8, product_url: "https://www.21vek.by/mouses/m170910004642_logitech.html",
    user: User.first, breakdown_cause_id: rand(1..6), breaked_at: Date.today
  },
  {
    nomination_id: 1 , cost: 10, product_url: "https://www.21vek.by/mouses/m310910003986_logitech.html",
    user: User.first, breakdown_cause_id: rand(1..6), breaked_at: Date.today-1.month
  },
  {
    nomination_id: 1 , cost: 10, product_url: "https://www.21vek.by/mouses/m310910003986_logitech.html",
    user: User.first, created_at: Time.now-rand(12..13).month
  },
  {
    nomination_id: 2 , cost: 25, product_url: "https://www.21vek.by/mouses/logitech_k120blackusb.html",
    user: User.first, created_at: Time.now-rand(12..13).month
  },
  {
    nomination_id: 3 , cost: 47, product_url: "https://www.21vek.by/monitors/c24f390fhilc24f390fhix_samsung.html",
    user: User.first, created_at: Time.now-rand(12..13).month
  },
  {
    nomination_id: 4 , cost: 247, product_url: "https://www.21vek.by/desktops/c180d4h05iv5_multioffice.html",
    user: User.first, created_at: Time.now-rand(12..13).month
  },

   # User 2
  {
    nomination_id: 1 , cost: 10, product_url: "https://www.21vek.by/mouses/m310910003986_logitech.html",
    user: User.second
  },
  {
    nomination_id: 5 , cost: 150, product_url: "https://www.21vek.by/notebooks/15seq1227ur24d64ea_hp.html",
    user: User.second
  },
  {
    nomination_id: 6 , cost: 20, product_url: "https://www.21vek.by/headphones/pulse3dwirelessheadsetforps5ps719387909_sony.html",
    user: User.second
  },
  {
    nomination_id: 7 , cost: 100, product_url: "https://www.21vek.by/pads/m10plustbx606f103ipsfhd4g64ggruaza5t0080ua_lenovo.html",
    user: User.second
  },
  {
    nomination_id: 11 , cost: 10, product_url: "https://www.21vek.by/usb/usb30usbtypec32gbzb199up01_usams.html",
    user: User.second
  },

  # User 3
  {
    nomination_id: 1 , cost: 25, product_url: "https://www.21vek.by/mouses/overlordgm89052890_defender.html",
    user: User.third, breakdown_cause_id: rand(1..6), breaked_at: Date.today-1.month
  },
  {
    nomination_id: 1 , cost: 25, product_url: "https://www.21vek.by/mouses/overlordgm89052890_defender.html",
    user: User.third
  },
  {
    nomination_id: 5 , cost: 425, product_url: "https://www.21vek.by/notebooks/aspirea31732p9k9nxhf2eu02h_acer.html",
    user: User.third, breakdown_cause_id: rand(1..6), breaked_at: Date.today-3.month
  },
  {
    nomination_id: 5 , cost: 325, product_url: "https://www.21vek.by/notebooks/aspirea31732p9k9nxhf2eu02h_acer.html",
    user: User.third
  },
  {
    nomination_id: 6 , cost: 15, product_url: "https://www.21vek.by/headphones/panasonic_rphtf295ek.html",
    user: User.third
  },
  {
    nomination_id: 8 , cost: 15, product_url: "https://www.21vek.by/ebooks/e60c_digma.html",
    user: User.third
  },
  {
    nomination_id: 9 , cost: 35, product_url: "https://www.21vek.by/mics/rdm125_ritmix.html",
    user: User.third
  },
  {
    nomination_id: 4 , cost: 1035, product_url: "https://www.21vek.by/all_in_one_computers/envy32a1003ur_hp.html",
    user: User.third
  },


  # User 4
  {
    nomination_id: 5 , cost: 520, product_url: "https://www.21vek.by/notebooks/ideapadl315ada0581w1004wrk_lenovo.html",
    user: User.fourth, breakdown_cause_id: rand(1..6), breaked_at: Date.today-3.month+3.day
  },
  {
    nomination_id: 5 , cost: 420, product_url: "https://www.21vek.by/notebooks/ideapadl315ada0581w1004wrk_lenovo.html",
    user: User.fourth, breakdown_cause_id: rand(1..6), breaked_at: Date.today-2.month+3.day
  },
  {
    nomination_id: 5 , cost: 520, product_url: "https://www.21vek.by/notebooks/ideapadl315ada0581w1004wrk_lenovo.html",
    user: User.fourth
  },
  {
    nomination_id: 9 , cost: 35, product_url: "https://www.21vek.by/mics/rdm125_ritmix.html",
    user: User.fourth
  },

  # User 5
  {
    nomination_id: 11 , cost: 35, product_url: "https://www.21vek.by/usb/hsusbengine256g_hikvision.html",
    user: User.fifth
  },
  {
    nomination_id: 4 , cost: 835, product_url: "https://www.21vek.by/desktops/gamer5i9400fd16hd1sd24x105tl2w5_jet.html",
    user: User.fifth
  },
  {
    nomination_id: 3 , cost: 235, product_url: "https://www.21vek.by/monitors/s24f350fhi_samsung.html",
    user: User.fifth
  },
  {
    nomination_id: 9 , cost: 135, product_url: "https://www.21vek.by/mics/desktopprofimicd03_gembird.html",
    user: User.fifth
  },

    # User 6
    {
      nomination_id: 1 , cost: 25, product_url: "https://www.21vek.by/mouses/overlordgm89052890_defender.html",
      user: User.last
    },
    {
      nomination_id: 5 , cost: 425, product_url: "https://www.21vek.by/notebooks/aspirea31732p9k9nxhf2eu02h_acer.html",
      user: User.last, breakdown_cause_id: rand(1..6), breaked_at: Date.today-3.month+3.day
    },
    {
      nomination_id: 5 , cost: 325, product_url: "https://www.21vek.by/notebooks/aspirea31732p9k9nxhf2eu02h_acer.html",
      user: User.last
    },
    {
      nomination_id: 6 , cost: 15, product_url: "https://www.21vek.by/headphones/panasonic_rphtf295ek.html",
      user: User.last
    },
    {
      nomination_id: 8 , cost: 15, product_url: "https://www.21vek.by/ebooks/e60c_digma.html",
      user: User.last
    },
    {
      nomination_id: 9 , cost: 35, product_url: "https://www.21vek.by/mics/rdm125_ritmix.html",
      user: User.last
    },
    {
      nomination_id: 4 , cost: 1035, product_url: "https://www.21vek.by/all_in_one_computers/envy32a1003ur_hp.html",
      user: User.last
    },

    # office
    {
      nomination_id: 11 , cost: 27, product_url: "https://www.21vek.by/usb/usb208gbzb96up01_usams.html",
      user: nil
    },
    {
      nomination_id: 11 , cost: 30, product_url: "https://www.21vek.by/usb/usb2064gbzb207up01_usams.html",
      user: nil
    },
    {
      nomination_id: 11 , cost: 29, product_url: "https://www.21vek.by/usb/pendriveusb30xdepo128gbpmfu3128x_platinet.html",
      user: nil
    },
    {
      nomination_id: 10 , cost: 1500, product_url: "https://www.21vek.by/mfp/versalinkc8000_xerox.html",
      user: nil
    },
    {
      nomination_id: 10 , cost: 425, product_url: "https://www.21vek.by/mfp/taskalfa3253ci_kyocera_mita.html",
      user: nil
    },

  ]

  units.each do |u|

      newUnit= Unit.create!(u)
      newUnit.created_at = prev_created_time
      newUnit.save
  end

# BIDS

def prev_closed_time
    Time.now-rand(1..4).month+rand(1..30).day
end

bids = [
  {
    user: User.first, nomination_id: 1, unit_id: 1, advice_product_url: "https://www.21vek.by/mouses/m170910004642_logitech.html",
    is_viewed: true, is_urgent: true, closed_at: prev_closed_time()
  },
  {
    user: User.first, nomination_id: 1, unit_id: 2, advice_product_url: "https://www.21vek.by/mouses/m310910003986_logitech.html",
    is_viewed: true, is_urgent: false, closed_at: prev_closed_time()
  },
  {
    user: User.first, nomination_id: 8,
    is_viewed: false, is_urgent: false, created_at: Time.now
  },

  {
    user: User.third, nomination_id: 1, unit_id: 13, advice_product_url: "https://www.21vek.by/mouses/overlordgm89052890_defender.html",
    is_viewed: true, is_urgent: true, closed_at: prev_closed_time()
  },
  {
    user: User.third, nomination_id: 5, unit_id: 15, advice_product_url: "https://www.21vek.by/notebooks/aspirea31732p9k9nxhf2eu02h_acer.html",
    is_viewed: true, is_urgent: true, closed_at: prev_closed_time()
  },
  {
    user: User.third, nomination_id: 6, unit_id: 16,
    advice_product_url: "https://www.21vek.by/headphones/panasonic_rphtf295ek.html",
    is_viewed: true, is_urgent: false, closed_at: prev_closed_time()
  },
  {
    user: User.third, nomination_id: 11,
    advice_product_url: "https://www.21vek.by/usb/usb3064gbzb196up01_usams.html",
    is_viewed: false, is_urgent: false
  },

  {
    user: User.fourth, nomination_id: 3,
    advice_product_url: "https://www.21vek.by/monitors/c24f390fhilc24f390fhix_samsung.html",
    is_viewed: false, is_urgent: true
  },
  {
    user: User.fourth, nomination_id: 6,
    advice_product_url: "https://www.21vek.by/headphones/ritmix_rh525.html",
    is_viewed: false, is_urgent: false
  },
  {
    user: User.fourth, nomination_id: 7,
    advice_product_url: "https://www.21vek.by/pads/wize41173gpmt41173gc_prestigio.html",
    is_viewed: false, is_urgent: false
  },
  {
    user: User.fourth, nomination_id: 11,
    advice_product_url: "https://www.21vek.by/usb/usb3064gbzb196up01_usams.html",
    is_viewed: false, is_urgent: true
  },

  {
    user: User.last, nomination_id: 5, unit_id: 30,
    advice_product_url: "https://www.21vek.by/notebooks/aspirea31732p9k9nxhf2eu02h_acer.html",
    is_viewed: true, is_urgent: true, closed_at: prev_closed_time()
  }
  ]

  bids.each do |b|

    new_bid = Bid.create!(b)

    if new_bid.unit_id.nil?
      new_bid.created_at = Time.now
    else
      new_bid.created_at = prev_created_time+40.day
    end

    new_bid.save
  end
