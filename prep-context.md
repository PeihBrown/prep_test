- Khởi tạo 1 base project cơ bản với architecture theo rule
- Xây dựng 1 màn hình web theo Business Logic đưa ra
- Hỗ trợ Responsive cho màn hình

// Business Requirement

1 - component: Tên chặng
  - loại control: Label 
  - desc: Hiển thị tên chặng: “Chặng: “ + tên chặng (data.level_name)

2 - component: Tháng
  - loại control: Group component
  - desc: Hiển thị tháng, năm chứa buổi học: "Tháng x, y"- với x là tháng, y là năm
Sử dụng date để gộp các buổi. Nếu không có date, sắp xếp các buổi dựa trên số thứ tự của buổi. Chi tiết được mô tả tại component số 3-4

3,4 - component: Card buổi học
  - loại control: Group component 
  - desc: Khu vực hiển thị thông tin buổi học (sessions) của user, gồm các loại trạng thái sau đây:
Buổi học đã hoàn thành -> Là buổi học mà user đã hoàn thành trước hoặc sau khi khởi tạo lịch học. Với các buổi học đã hoàn thành, trạng thái buổi có màu Xanh lá cây.
Buổi học muộn -> Là buổi học trước Ngày hôm nay nhưng chưa hoàn thành
Với các buổi học muộn, trạng thái buổi có màu Cam
Buổi học ngày hôm nay -> Buổi học ngày hôm nay được tự động focus và có thêm border tương ứng với trạng thái của nó. Nếu học viên đã hoàn thành buổi học ngày hôm nay, chuyển trạng thái sang màu Xanh lá cây. Nếu chưa hoàn thành, chuyển trạng thái buổi học sang màu Xanh da trời.
Buổi học trong tương lai -> Là buổi học xảy ra trong tương lai. Buổi học này sẽ được đánh dấu màu xám. Các Unit trong buổi học này sẽ được đánh dấu màu Xanh da trời.
Thông tin các buổi được sắp xếp như sau:
Số Thứ tự buổi: “Buổi X” với x lấy từ overall_index
Ngày được xếp lịch, hiển thị ở phía trên bên phải, với định dạng "Th {{thứ}}, {{ngày}} thg {{tháng}}". Nếu buổi học đã hoàn thành trước khi khởi tạo lịch học, không hiển thị thông tin này
Danh sách các unit trong buổi:
Icon lục giác → Màu của icon đi theo màu trạng thái của buổi
Tên Unit
Khi hover vào tên Unit, hiện highlight và gạch chân vào Tên unit theo màu của buổi như mô tả phía trên.
Thông tin ngày hoàn thành: Kiểm tra tại field completion_date
Nếu có thông tin ngày hoàn thành, hiển thị text: “Đã hoàn thành: {{ngày}}” màu Xanh lá cây, trong đó ngày được viết với format Thứ Hai, 00 thg 00.
Nếu đây là buổi học muộn, hiển thị text “Bạn chưa hoàn thành buổi học này” màu Cam.
Nếu đây là buổi học được hoàn thành trước khi xếp lịch (date == null), hiển thị text “Đã hoàn thành trước khi khởi tạo Study Plan” màu Xanh lá cây
Sắp xếp các buổi học theo thứ tự như được đánh số và gom nhóm vào các tháng tương ứng dựa theo date của buổi học. Đối với các buổi học đã hoàn thành trước khi khởi tạo lịch học và không có thông tin date, sử dụng số thứ tự để sắp xếp.

5 - component: Tiến độ học
  - loại control: Group component
  - desc: Hiển thị thông tin Tiến độ học:
Title: Tiến độ học
Số ngày còn lại: x/y ngày, trong đó: x lấy từ remaining_duration, y lấy từ duration.
Số cúp đã đạt: x/y, trong đó x lấy từ missions.earned_cups, y lấy từ missions.total_cups,
Số Unit đạt 02 cúp/ Tổng số Unit:
Hiển thị 2 thanh progress tương ứng với 2 thông tin:
Thực tế: x/y Units, tương ứng với missions.actual_completed_units và missions.total_unit. Thanh progress được thể hiện bằng màu Xanh lá cây. Giá trị của progress = x/y
Kế hoạch: x/y Units, tương ứng với missions.expected_completed_units và missions.total_unit. Thanh progress được thể hiện bằng màu Xanh da trời. Giá trị của progress = x/y
Label:
Thực tế > kế hoạch: “Bạn đang học nhanh hơn kế hoạch”
Thực tế == kế hoạch: “Bạn đang học đúng với kế hoạch”
Thực tế < kế hoạch: “Bạn đang học chậm hơn kế hoạch”

6 - component: Tên ứng viên
  - loại control: Label
  - desc: Điền tên của bạn vào đây nhé!

7 - component: Tiêu đề + button Hôm nay
  - loại control: Group component
  - desc: Tiêu đề: “Tổng quan”
Button “Hôm nay”:
Tap button hệ thống tự động di chuyển scroll tới buổi học ngày hôm nay.


// Data

- Dùng data bên dưới để mock calling api:
{
    "data": {
        "level_name": "HSK 1",
        "duration": 48,
        "remaining_duration": 36,
        "units": [
            {
                "unit_id": 4265,
                "unit_title": "Bài giới thiệu"
            },
            {
                "unit_id": 4303,
                "unit_title": "Khám phá 25 bộ cấu tạo nên chữ Hán cơ bản"
            },
            {
                "unit_id": 4305,
                "unit_title": "Nâng cấp với 19 bộ cấu tạo nên chữ Hán mở rộng"
            },
            {
                "unit_id": 4307,
                "unit_title": "Chinh phục Hán tự với 8 bộ cấu tạo nên chữ Hán nâng cao"
            },
            {
                "unit_id": 4414,
                "unit_title": "Giới thiệu"
            },
            {
                "unit_id": 4707,
                "unit_title": "Ngữ âm"
            },
            {
                "unit_id": 4415,
                "unit_title": "Chủ đề 1 - Làm quen chữ Hán"
            },
            {
                "unit_id": 4418,
                "unit_title": "Chủ đề 2 - 你忙吗？(Bạn bận không?)"
            },
            {
                "unit_id": 4416,
                "unit_title": "Chủ đề 3 - 谢谢你！(Cảm ơn bạn!)"
            },
            {
                "unit_id": 4417,
                "unit_title": "Chủ đề 4 - 你家有几口人？（Nhà bạn có mấy người?)"
            },
            {
                "unit_id": 4419,
                "unit_title": "Chủ đề 5 - 她女儿今年二十岁。 (Năm nay con gái cô ấy 20 tuổi.)"
            },
            {
                "unit_id": 4435,
                "unit_title": "Bài kiểm tra 1"
            },
            {
                "unit_id": 4420,
                "unit_title": "Chủ đề 6 - 我会说汉语。(Tôi biết nói tiếng Trung.)"
            },
            {
                "unit_id": 4421,
                "unit_title": "Chủ đề 7 - 今天星期几? (Hôm nay là thứ mấy?)"
            },
            {
                "unit_id": 4422,
                "unit_title": "Chủ đề 8 - 我想喝奶茶。(Tôi muốn uống trà sữa.)"
            },
            {
                "unit_id": 4423,
                "unit_title": "Chủ đề 9 - 你在哪儿工作? (Bạn làm việc ở đâu?)"
            },
            {
                "unit_id": 4424,
                "unit_title": "Chủ đề 10 - 我能不能坐这儿？ (Tôi ngồi đây được không?)"
            },
            {
                "unit_id": 4436,
                "unit_title": "Bài kiểm tra 2"
            },
            {
                "unit_id": 4425,
                "unit_title": "Chủ đề 11 - 现在几点? (Bây giờ là mấy giờ?)"
            },
            {
                "unit_id": 4426,
                "unit_title": "Chủ đề 12 - 明天天气怎么样? (Thời tiết ngày mai thế nào?)"
            },
            {
                "unit_id": 4427,
                "unit_title": "Chủ đề 13 - 你在做什么呢？ (Bạn đang làm gì vậy?)"
            },
            {
                "unit_id": 4428,
                "unit_title": "Chủ đề 14 - 我去商店买水果。(Tôi đi cửa hàng mua hoa quả.)"
            },
            {
                "unit_id": 4429,
                "unit_title": "Chủ đề 15 - 我们是坐出租车来的。(Chúng tôi đến đây bằng xe taxi.)"
            },
            {
                "unit_id": 4437,
                "unit_title": "Bài kiểm tra 3"
            },
            {
                "unit_id": 4430,
                "unit_title": "Chủ đề 16 - 你喜欢不喜欢今天的电影？(Bạn có thích bộ phim ngày hôm nay không?)"
            },
            {
                "unit_id": 4431,
                "unit_title": "Chủ đề 17 - 你想吃面包还是面条儿？ (Bạn muốn ăn bánh mỳ hay mỳ sợi?)"
            },
            {
                "unit_id": 4432,
                "unit_title": "Chủ đề 18 - 我先介绍一下儿。 (Tôi giới thiệu trước một chút.)"
            },
            {
                "unit_id": 4433,
                "unit_title": "Chủ đề 19 - 你跟我一起去买新的电视机吧！ (Hãy cùng tôi đi mua TV mới nhé!)"
            },
            {
                "unit_id": 4434,
                "unit_title": "Chủ đề 20 - 我喜欢一边看书，一边喝茶。(Tôi thích vừa đọc sách vừa uống trà.)"
            },
            {
                "unit_id": 4438,
                "unit_title": "Bài kiểm tra 4"
            },
            {
                "unit_id": 4439,
                "unit_title": "Chủ đề 21 - 这块手表比我的手机还贵。(Chiếc đồng hồ này còn đắt hơn điện thoại của tôi.)"
            },
            {
                "unit_id": 4440,
                "unit_title": "Chủ đề 22 - 学校里边有商店吗？(Bên trong trường học có cửa hàng không?)"
            },
            {
                "unit_id": 4441,
                "unit_title": "Chủ đề 23 - 旁边是一家咖啡店。(Bên cạnh là một quán cafe.)"
            },
            {
                "unit_id": 4442,
                "unit_title": "Chủ đề 24 - 有的东西是我的，有的东西是妹妹的。(Có thứ đồ là của tôi, có thứ là của em gái tôi.)"
            },
            {
                "unit_id": 4443,
                "unit_title": "Chủ đề 25 - 你们要多听，多说，多读，多写。(Các bạn phải nghe, nói, đọc, viết nhiều.)"
            },
            {
                "unit_id": 4444,
                "unit_title": "Bài kiểm tra 5"
            },
            {
                "unit_id": 4445,
                "unit_title": "Chủ đề 26 - 地点还没找到。(Vẫn chưa tìm được địa điểm.)"
            },
            {
                "unit_id": 4446,
                "unit_title": "Chủ đề 27 - 你常常去图书馆学习吗？(Bạn có thường xuyên đi thư viện học không?)"
            },
            {
                "unit_id": 4447,
                "unit_title": "Chủ đề 28 - 她是外语学院最好的学生。(Cô ấy là sinh viên giỏi nhất Học viện Ngoại ngữ.)"
            },
            {
                "unit_id": 4448,
                "unit_title": "Chủ đề 29 - 他还高兴地说：谢谢小朋友！ (Ông ấy còn vui vẻ nói: Cảm ơn bạn nhỏ!)"
            },
            {
                "unit_id": 4449,
                "unit_title": "Chủ đề 30 - 他在楼上，你想跟他见面吗？ (Anh ấy ở trên tầng, bạn muốn gặp anh ấy không?)"
            },
            {
                "unit_id": 4450,
                "unit_title": "Bài kiểm tra 6"
            },
            {
                "unit_id": 4680,
                "unit_title": "Đề thi 1"
            },
            {
                "unit_id": 4681,
                "unit_title": "Đề thi 2"
            },
            {
                "unit_id": 4749,
                "unit_title": "Đề thi 3"
            },
            {
                "unit_id": 4750,
                "unit_title": "Đề thi 4"
            },
            {
                "unit_id": 4751,
                "unit_title": "Đề thi 5"
            },
            {
                "unit_id": 4752,
                "unit_title": "Đề thi 6"
            },
            {
                "unit_id": 4753,
                "unit_title": "Đề thi 7"
            },
            {
                "unit_id": 4754,
                "unit_title": "Đề thi 8"
            },
            {
                "unit_id": 4755,
                "unit_title": "Đề thi 9"
            },
            {
                "unit_id": 4756,
                "unit_title": "Đề thi 10"
            }
        ],
                "sessions": [
            {
                "completion_date": null,
                "date": null,
                "is_scheduled": false,
                "overall_index": 1,
                "unit_ids": [
                    4265
                ],
                "proficiency": 3,
                "total_proficiency": 3,
                "completed": true
            },
            {
                "completion_date": null,
                "date": null,
                "is_scheduled": false,
                "overall_index": 2,
                "unit_ids": [
                    4303
                ],
                "proficiency": 3,
                "total_proficiency": 3,
                "completed": true
            },
            {
                "completion_date": "2024-12-31",
                "date": "2025-01-01",
                "is_scheduled": true,
                "overall_index": 3,
                "unit_ids": [
                    4305
                ],
                "proficiency": 3,
                "total_proficiency": 3,
                "completed": true
            },
            {
                "completion_date": "2024-12-31",
                "date": "2025-01-02",
                "is_scheduled": true,
                "overall_index": 4,
                "unit_ids": [
                    4307
                ],
                "proficiency": 3,
                "total_proficiency": 3,
                "completed": true
            },
            {
                "completion_date": null,
                "date": null,
                "is_scheduled": false,
                "overall_index": 5,
                "unit_ids": [
                    4414
                ],
                "proficiency": 3,
                "total_proficiency": 3,
                "completed": true
            },
            {
                "completion_date": "2025-01-01",
                "date": "2025-01-03",
                "is_scheduled": true,
                "overall_index": 6,
                "unit_ids": [
                    4707
                ],
                "proficiency": 2,
                "total_proficiency": 3,
                "completed": true
            },
            {
                "completion_date": "2025-01-02",
                "date": "2025-01-04",
                "is_scheduled": true,
                "overall_index": 7,
                "unit_ids": [
                    4415
                ],
                "proficiency": 3,
                "total_proficiency": 3,
                "completed": true
            },
            {
                "completion_date": "2025-01-02",
                "date": "2025-01-05",
                "is_scheduled": true,
                "overall_index": 8,
                "unit_ids": [
                    4418
                ],
                "proficiency": 3,
                "total_proficiency": 3,
                "completed": true
            },
            {
                "completion_date": "2025-01-09",
                "date": "2025-01-06",
                "is_scheduled": true,
                "overall_index": 9,
                "unit_ids": [
                    4416
                ],
                "proficiency": 2,
                "total_proficiency": 3,
                "completed": true
            },
            {
                "completion_date": null,
                "date": "2025-01-07",
                "is_scheduled": true,
                "overall_index": 10,
                "unit_ids": [
                    4417
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-08",
                "is_scheduled": true,
                "overall_index": 11,
                "day_of_week": 3,
                "unit_ids": [
                    4419
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-09",
                "is_scheduled": true,
                "overall_index": 12,
                "unit_ids": [
                    4435
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": null,
                "is_scheduled": false,
                "overall_index": 13,
                "unit_ids": [
                    4420
                ],
                "proficiency": 3,
                "total_proficiency": 3,
                "completed": true
            },
            {
                "completion_date": null,
                "date": "2025-01-10",
                "is_scheduled": true,
                "overall_index": 14,
                "unit_ids": [
                    4421
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-11",
                "is_scheduled": true,
                "overall_index": 15,
                "unit_ids": [
                    4422
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-12",
                "is_scheduled": true,
                "overall_index": 16,
                "unit_ids": [
                    4423
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-13",
                "is_scheduled": true,
                "overall_index": 17,
                "unit_ids": [
                    4424
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-14",
                "is_scheduled": true,
                "overall_index": 18,
                "unit_ids": [
                    4436
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-15",
                "is_scheduled": true,
                "overall_index": 19,
                "unit_ids": [
                    4425
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-16",
                "is_scheduled": true,
                "overall_index": 20,
                "unit_ids": [
                    4426
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-17",
                "is_scheduled": true,
                "overall_index": 21,
                "unit_ids": [
                    4427
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-18",
                "is_scheduled": true,
                "overall_index": 22,
                "unit_ids": [
                    4428
                ],
                "proficiency": 1,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-19",
                "is_scheduled": true,
                "overall_index": 23,
                "unit_ids": [
                    4429
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-20",
                "is_scheduled": true,
                "overall_index": 24,
                "day_of_week": 1,
                "unit_ids": [
                    4437
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-21",
                "is_scheduled": true,
                "overall_index": 25,
                "unit_ids": [
                    4430
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-22",
                "is_scheduled": true,
                "overall_index": 26,
                "unit_ids": [
                    4431
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-23",
                "is_scheduled": true,
                "overall_index": 27,
                "unit_ids": [
                    4432
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-24",
                "is_scheduled": true,
                "overall_index": 28,
                "unit_ids": [
                    4433
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-25",
                "is_scheduled": true,
                "overall_index": 29,
                "unit_ids": [
                    4434
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-26",
                "is_scheduled": true,
                "overall_index": 30,
                "unit_ids": [
                    4438
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-27",
                "is_scheduled": true,
                "overall_index": 31,
                "unit_ids": [
                    4439
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-28",
                "is_scheduled": true,
                "overall_index": 32,
                "unit_ids": [
                    4440
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-29",
                "is_scheduled": true,
                "overall_index": 33,
                "unit_ids": [
                    4441
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-30",
                "is_scheduled": true,
                "overall_index": 34,
                "unit_ids": [
                    4442
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-01-31",
                "is_scheduled": true,
                "overall_index": 35,
                "unit_ids": [
                    4443
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-02-01",
                "is_scheduled": true,
                "overall_index": 36,
                "unit_ids": [
                    4444
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-02-02",
                "is_scheduled": true,
                "overall_index": 37,
                "unit_ids": [
                    4445
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": null,
                "is_scheduled": false,
                "overall_index": 38,
                "day_of_week": 1,
                "unit_ids": [
                    4446
                ],
                "proficiency": 3,
                "total_proficiency": 3,
                "completed": true
            },
            {
                "completion_date": null,
                "date": "2025-02-04",
                "is_scheduled": true,
                "overall_index": 39,
                "unit_ids": [
                    4447
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-02-05",
                "is_scheduled": true,
                "overall_index": 40,
                "unit_ids": [
                    4448
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-02-06",
                "is_scheduled": true,
                "overall_index": 41,
                "unit_ids": [
                    4449
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-02-07",
                "is_scheduled": true,
                "overall_index": 42,
                "unit_ids": [
                    4450
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-02-08",
                "is_scheduled": true,
                "overall_index": 43,
                "unit_ids": [
                    4680
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-02-09",
                "is_scheduled": true,
                "overall_index": 44,
                "unit_ids": [
                    4681
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-02-10",
                "is_scheduled": true,
                "overall_index": 45,
                "unit_ids": [
                    4749
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-02-11",
                "is_scheduled": true,
                "overall_index": 46,
                "unit_ids": [
                    4750
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-02-12",
                "is_scheduled": true,
                "overall_index": 47,
                "unit_ids": [
                    4751
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-02-13",
                "is_scheduled": true,
                "overall_index": 48,
                "unit_ids": [
                    4752
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-02-14",
                "is_scheduled": true,
                "overall_index": 49,
                "unit_ids": [
                    4753
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": "2025-02-15",
                "is_scheduled": true,
                "overall_index": 50,
                "unit_ids": [
                    4754
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            },
            {
                "completion_date": null,
                "date": null,
                "is_scheduled": false,
                "overall_index": 51,
                "unit_ids": [
                    4755
                ],
                "proficiency": 3,
                "total_proficiency": 3,
                "completed": true
            },
            {
                "completion_date": null,
                "date": "2025-02-17",
                "is_scheduled": true,
                "overall_index": 52,
                "unit_ids": [
                    4756
                ],
                "proficiency": 0,
                "total_proficiency": 3,
                "completed": false
            }
        ],
        "missions": {
            "total_units": 52,
            "total_cups": 156,
            "actual_completed_units": 17,
            "expected_completed_units": 24,
            "earned_cups": 20
        }
    }
}

