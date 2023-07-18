import { useState, useEffect } from "react"
import {
  format,
  subMonths,
  addMonths,
  subYears,
  addYears,
  isEqual,
  isPast,
  getDaysInMonth,
  getDay,
} from "date-fns"
import { CalendarIcon } from "@heroicons/react/24/outline"
import { Field, useFormikContext, FormikValues } from "formik"

type DatepickerType = "date" | "month" | "year"

interface DatePickerProps {
  fieldName: string | number
  defaultDate: string | Date
  onChangeHandle:Function
}

const DatePicker: React.FunctionComponent<DatePickerProps> = ({
  fieldName,
  defaultDate,
  onChangeHandle
}) => {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const [dayCount, setDayCount] = useState<Array<number>>([])
  const [blankDays, setBlankDays] = useState<Array<number>>([])
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(
    new Date(defaultDate),
  )
  const [selectedDate, setSelectedDate] = useState(new Date(defaultDate))
  const [type, setType] = useState<DatepickerType>("date")
  const { values } = useFormikContext<FormikValues>()

  const decrement = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1))
        break
      case "month":
        setDatepickerHeaderDate((prev) => subYears(prev, 1))
        break
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1))
        break
    }
  }

  const increment = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => addMonths(prev, 1))
        break
      case "month":
        setDatepickerHeaderDate((prev) => addYears(prev, 1))
        break
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1))
        break
    }
  }

  const isToday = (date: number) => {
    const result = isEqual(
      new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      ),
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        date,
      ),
    )

    return result
  }

  const isPrevious = (date: number) => {
    const result = isPast(
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        date,
      ),
    )
    return result
  }

  const setDateValue = (date: number) => () => {
    const selectedDatePick = new Date(
      datepickerHeaderDate.getFullYear(),
      datepickerHeaderDate.getMonth(),
      date,
    )
    setSelectedDate(selectedDatePick)
    // set the value to form
    const selectedDateFormValue = format(selectedDatePick, "yyyy-MM-dd")
    values[fieldName] = selectedDateFormValue
    onChangeHandle(selectedDateFormValue)
    setShowDatepicker(false)
  }

  const getDayCount = (date: Date) => {
    let daysInMonth = getDaysInMonth(date)

    // find where to start calendar day of week
    let dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1))
    let blankdaysArray = []
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i)
    }

    let daysArray = []
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i)
    }

    setBlankDays(blankdaysArray)
    setDayCount(daysArray)
  }

  const isSelectedMonth = (month: number) =>
    isEqual(
      new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
      selectedDate,
    )

  const setMonthValue = (month: number) => () => {
    setDatepickerHeaderDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        month,
        datepickerHeaderDate.getDate(),
      ),
    )
    setType("date")
  }

  const toggleDatepicker = () => setShowDatepicker((prev) => !prev)

  const showMonthPicker = () => setType("month")

  const showYearPicker = () => setType("date")

  useEffect(() => {
    getDayCount(datepickerHeaderDate)
  }, [datepickerHeaderDate])

  return (
    <div className="w-full max-w-xs bg-gray-200 z-50">
      <div className="relative">
        <input type="hidden" name="date" />
        <Field
          name={fieldName}
          type="text"
          readOnly
          className="cursor-pointer w-full pl-4 pr-10 py-2 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-sm input input-bordered input-sm"
          placeholder="Select date"
          value={format(selectedDate, "yyyy-MM-dd")}
          onClick={toggleDatepicker}
        />
        <div
          className="cursor-pointer absolute top-0 right-0 px-3 py-2"
          onClick={toggleDatepicker}
        >
          <CalendarIcon className="h-4 w-4 text-grey transition" />
        </div>
        {showDatepicker && (
          <div className="bg-base-100 mt-12 rounded-lg shadow p-4 absolute top-0 left-0 z-50">
            <div className="flex justify-between items-center mb-2">
              <div>
                <button
                  type="button"
                  className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                  onClick={decrement}
                >
                  <svg
                    className="h-6 w-6 text-gray-500 inline-flex"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>
              {type === "date" && (
                <div
                  onClick={showMonthPicker}
                  className="flex-grow p-1 text-lg font-bold text-gray-800 cursor-pointer hover:bg-gray-200 rounded-lg"
                >
                  <p className="text-center">
                    {format(datepickerHeaderDate, "MMMM")}
                  </p>
                </div>
              )}
              <div
                onClick={showYearPicker}
                className="flex-grow p-1 text-lg font-bold text-gray-800 cursor-pointer hover:bg-gray-200 rounded-lg"
              >
                <p className="text-center">
                  {format(datepickerHeaderDate, "yyyy")}
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                  onClick={increment}
                >
                  <svg
                    className="h-6 w-6 text-gray-500 inline-flex"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {type === "date" && (
              <>
                <div className="flex flex-wrap mb-3 -mx-1">
                  {DAYS.map((day, i) => (
                    <div key={i} style={{ width: "14.26%" }} className="px-1">
                      <div className="text-gray-800 font-medium text-center text-xs">
                        {day}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap -mx-1">
                  {blankDays.map((_, i) => (
                    <div
                      key={i}
                      style={{ width: "14.26%" }}
                      className="text-center border p-1 border-transparent text-sm"
                    ></div>
                  ))}
                  {dayCount.map((d, i) => (
                    <div
                      key={i}
                      style={{ width: "14.26%" }}
                      className="px-1 mb-1"
                    >
                      {!isPrevious(d) ? (
                        <div
                          className="text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100
                          disabled bg-base-300 text-base-100"
                        >
                          {d}
                        </div>
                      ) : (
                        <div
                          onClick={setDateValue(d)}
                          className={`text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 ${
                            isToday(d)
                              ? "bg-primary text-base-100"
                              : "cursor-pointer text-gray-700 hover:bg-primary hover:text-base-100"
                          }`}
                        >
                          {d}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            {type === "month" && (
              <div className="flex flex-wrap -mx-1">
                {Array(12)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      key={i}
                      onClick={setMonthValue(i)}
                      style={{ width: "25%" }}
                    >
                      <div
                        className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${
                          isSelectedMonth(i)
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 hover:bg-blue-200"
                        }`}
                      >
                        {format(
                          new Date(
                            datepickerHeaderDate.getFullYear(),
                            i,
                            datepickerHeaderDate.getDate(),
                          ),
                          "MMM",
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}{" "}
          </div>
        )}
      </div>
    </div>
  )
}

export default DatePicker
