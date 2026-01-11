import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Trip {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  status: 'completed' | 'cancelled';
  driver: string;
  carModel: string;
  distance: string;
  duration: string;
  rating: number;
  paymentMethod: string;
}

interface TaxiCar {
  id: string;
  lat: number;
  lng: number;
}

interface Driver {
  name: string;
  rating: number;
  trips: number;
  carModel: string;
  carNumber: string;
  carColor: string;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState('map');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [selectedTariff, setSelectedTariff] = useState('economy');

  const trips: Trip[] = [
    {
      id: '1',
      from: 'ул. Ленина, 25',
      to: 'Аэропорт Шереметьево',
      date: '15 янв 2026',
      time: '14:30',
      price: 1250,
      status: 'completed',
      driver: 'Иван П.',
      carModel: 'Toyota Camry',
      distance: '42.5 км',
      duration: '45 мин',
      rating: 5,
      paymentMethod: 'Карта •••• 4242'
    },
    {
      id: '2',
      from: 'Тверская ул., 10',
      to: 'ТЦ Атриум',
      date: '10 янв 2026',
      time: '19:15',
      price: 450,
      status: 'completed',
      driver: 'Сергей М.',
      carModel: 'Kia Rio',
      distance: '8.2 км',
      duration: '18 мин',
      rating: 4,
      paymentMethod: 'Наличные'
    },
    {
      id: '3',
      from: 'Проспект Мира, 45',
      to: 'Красная площадь',
      date: '08 янв 2026',
      time: '11:00',
      price: 380,
      status: 'cancelled',
      driver: 'Андрей К.',
      carModel: 'Hyundai Solaris',
      distance: '6.5 км',
      duration: '15 мин',
      rating: 0,
      paymentMethod: 'Карта •••• 1234'
    }
  ];

  const tariffs = [
    { id: 'economy', name: 'Эконом', price: '~350₽', time: '5 мин', icon: 'Car', color: 'bg-green-500', description: 'Недорого и быстро', features: ['4 места', 'Кондиционер'] },
    { id: 'comfort', name: 'Комфорт', price: '~550₽', time: '7 мин', icon: 'CarFront', color: 'bg-purple-500', description: 'Просторный салон', features: ['4 места', 'Премиум авто', 'Wi-Fi'] },
    { id: 'business', name: 'Бизнес', price: '~850₽', time: '10 мин', icon: 'Gem', color: 'bg-amber-500', description: 'Премиум-класс', features: ['3 места', 'Люкс авто', 'Вода', 'Wi-Fi'] }
  ];

  const taxiCars: TaxiCar[] = [
    { id: '1', lat: 55.751244, lng: 37.618423 },
    { id: '2', lat: 55.753544, lng: 37.621423 },
    { id: '3', lat: 55.749244, lng: 37.615423 },
    { id: '4', lat: 55.752244, lng: 37.619423 },
    { id: '5', lat: 55.750244, lng: 37.617423 }
  ];

  const handleOrderTaxi = () => {
    if (from && to) {
      alert(`Заказ оформлен!\nОткуда: ${from}\nКуда: ${to}\nТариф: ${tariffs.find(t => t.id === selectedTariff)?.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-screen flex flex-col">
        <div className="flex-1 overflow-auto">
          <TabsContent value="map" className="h-full m-0 p-0">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                      <Icon name="MapPin" className="text-white" size={32} />
                    </div>
                  </div>
                  
                  {taxiCars.map((car, index) => (
                    <div
                      key={car.id}
                      className="absolute animate-fade-in"
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + (index % 3) * 20}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div className="relative">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                          <Icon name="Car" className="text-purple-600" size={20} />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute top-6 left-0 right-0 px-4 z-10 animate-fade-in">
                <Card className="p-4 shadow-xl border-0 bg-white/95 backdrop-blur">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">Куда едем?</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon name="MapPin" size={16} className="text-purple-500" />
                      <span>Москва</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="relative">
                      <Icon name="MapPin" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        placeholder="Откуда"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="pl-10 h-12 text-base"
                      />
                    </div>
                    <div className="relative">
                      <Icon name="Flag" className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500" size={20} />
                      <Input
                        placeholder="Куда"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="pl-10 h-12 text-base"
                      />
                    </div>
                  </div>
                </Card>
              </div>

              <div className="absolute bottom-24 left-0 right-0 px-4 z-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Card className="p-4 shadow-xl border-0 bg-white/95 backdrop-blur">
                  <h3 className="font-semibold text-sm text-gray-600 mb-3">Выберите тариф</h3>
                  <div className="space-y-2">
                    {tariffs.map((tariff) => (
                      <button
                        key={tariff.id}
                        onClick={() => setSelectedTariff(tariff.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                          selectedTariff === tariff.id
                            ? `border-${tariff.id === 'economy' ? 'green' : tariff.id === 'comfort' ? 'purple' : 'amber'}-500 bg-${tariff.id === 'economy' ? 'green' : tariff.id === 'comfort' ? 'purple' : 'amber'}-50`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            selectedTariff === tariff.id ? `${tariff.color} text-white` : 'bg-gray-100 text-gray-600'
                          }`}>
                            <Icon name={tariff.icon as any} size={20} />
                          </div>
                          <div className="text-left flex-1">
                            <div className="font-semibold">{tariff.name}</div>
                            <div className="text-xs text-gray-500">{tariff.description}</div>
                            <div className="flex gap-2 mt-1 flex-wrap">
                              {tariff.features.map((feature, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 px-2 py-0.5 rounded">{feature}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="text-right ml-3">
                          <div className="font-bold text-lg">{tariff.price}</div>
                          <div className="text-xs text-gray-500">{tariff.time}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <Button 
                    onClick={handleOrderTaxi}
                    className="w-full mt-4 h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={!from || !to}
                  >
                    Заказать такси
                  </Button>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="m-0 p-4 space-y-3 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 mt-2">История поездок</h2>
            {trips.map((trip, index) => (
              <Card 
                key={trip.id} 
                className="p-4 hover:shadow-md transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="MapPin" size={16} className="text-gray-400" />
                      <span className="font-medium">{trip.from}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Flag" size={16} className="text-pink-500" />
                      <span className="font-medium">{trip.to}</span>
                    </div>
                  </div>
                  <Badge className={trip.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}>
                    {trip.status === 'completed' ? 'Завершена' : 'Отменена'}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon name="Calendar" size={14} />
                    <span>{trip.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon name="Clock" size={14} />
                    <span>{trip.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon name="Navigation" size={14} />
                    <span>{trip.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon name="Timer" size={14} />
                    <span>{trip.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Icon name="User" size={14} />
                    <span>{trip.driver}</span>
                    <span className="text-gray-400">•</span>
                    <Icon name="Car" size={14} />
                    <span>{trip.carModel}</span>
                  </div>
                  <span className="font-bold text-lg text-foreground">{trip.price}₽</span>
                </div>
                {trip.status === 'completed' && trip.rating > 0 && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={14} 
                          className={i < trip.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">•</span>
                    <Icon name="CreditCard" size={14} className="text-gray-600" />
                    <span className="text-sm text-gray-600">{trip.paymentMethod}</span>
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="profile" className="m-0 p-4 animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6 mt-4">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-2xl">АС</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">Алексей Смирнов</h2>
                <p className="text-gray-600">+7 (900) 123-45-67</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <Icon name="Wallet" className="text-green-600" size={24} />
                    </div>
                    <div className="text-2xl font-bold mb-1">1,250₽</div>
                    <div className="text-sm text-gray-600">Баланс</div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                      <Icon name="Star" className="text-amber-600" size={24} />
                    </div>
                    <div className="text-2xl font-bold mb-1">4.8</div>
                    <div className="text-sm text-gray-600">Рейтинг</div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <Icon name="Route" className="text-purple-600" size={24} />
                    </div>
                    <div className="text-2xl font-bold mb-1">127</div>
                    <div className="text-sm text-gray-600">Поездок</div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <Icon name="Award" className="text-blue-600" size={24} />
                    </div>
                    <div className="text-2xl font-bold mb-1">15%</div>
                    <div className="text-sm text-gray-600">Скидка</div>
                  </div>
                </Card>
              </div>

              <div className="space-y-3">

                <Card className="p-4">
                  <button className="w-full flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon name="CreditCard" className="text-gray-600" size={20} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Способы оплаты</div>
                        <div className="text-sm text-gray-600">Карты и счета</div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" className="text-gray-400" size={20} />
                  </button>
                </Card>

                <Card className="p-4">
                  <button className="w-full flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon name="MapPin" className="text-gray-600" size={20} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Сохранённые адреса</div>
                        <div className="text-sm text-gray-600">Дом, работа и другие</div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" className="text-gray-400" size={20} />
                  </button>
                </Card>

                <Card className="p-4">
                  <button className="w-full flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon name="Settings" className="text-gray-600" size={20} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Настройки</div>
                        <div className="text-sm text-gray-600">Уведомления и прочее</div>
                      </div>
                    </div>
                    <Icon name="ChevronRight" className="text-gray-400" size={20} />
                  </button>
                </Card>
              </div>
            </div>
          </TabsContent>
        </div>

        <TabsList className="grid grid-cols-3 h-16 rounded-none border-t bg-white">
          <TabsTrigger value="map" className="flex flex-col gap-1 h-full data-[state=active]:text-primary">
            <Icon name="Map" size={24} />
            <span className="text-xs">Карта</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex flex-col gap-1 h-full data-[state=active]:text-primary">
            <Icon name="Clock" size={24} />
            <span className="text-xs">История</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex flex-col gap-1 h-full data-[state=active]:text-primary">
            <Icon name="User" size={24} />
            <span className="text-xs">Профиль</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}